"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardContentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const board_categories_service_1 = require("../board-categories/board-categories.service");
const board_selected_categories_service_1 = require("../board-selected-categories/board-selected-categories.service");
const boards_service_1 = require("../boards/boards.service");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const board_content_entity_1 = require("./entities/board-content.entity");
const constants_1 = require("./constants");
const common_utils_1 = require("../common/common.utils");
const paginate_1 = require("../paginate");
const lodash_1 = require("lodash");
let BoardContentsService = class BoardContentsService {
    constructor(bcRepository, usersService, boardsService, bscatsService, bcatsService) {
        this.bcRepository = bcRepository;
        this.usersService = usersService;
        this.boardsService = boardsService;
        this.bscatsService = bscatsService;
        this.bcatsService = bcatsService;
    }
    async create(user_id, createBoardContentDto) {
        const board = await this.boardsService.findBoard({ bd_idx: createBoardContentDto.bd_idx });
        const write_auth = board.bd_write_auth.split("|");
        const user = await this.usersService.findOne(user_id);
        if (!write_auth.includes((0, lodash_1.get)(user, ['user_group', 'grp_id']))) {
            throw new common_1.UnauthorizedException('권한이 없습니다.');
        }
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)(createBoardContentDto.category) }
        });
        const boardContent = await this.saveBoardContent({ user, board }, createBoardContentDto);
        boardContent.bscats = [];
        for (const key in bcats) {
            boardContent.bscats.push(await this.bscatsService.saveToBscat(bcats[key], boardContent));
        }
        return boardContent;
    }
    async findAll(options) {
        const { take, page } = options;
        const [results, total] = await this.bcRepository.findAndCount({
            order: { bc_createdAt: 'DESC' },
            where: { bc_status: constants_1.bcConstants.status.registration, bc_type: (0, typeorm_2.In)(this.getNoneNoticeType()) },
            relations: ['user', 'board', 'bscats'],
            take: take,
            skip: take * (page - 1)
        });
        return new paginate_1.Pagination({
            results,
            total,
        });
    }
    async findNoticeAll() {
        return await this.bcRepository.find({
            order: { bc_createdAt: 'DESC' },
            where: { bc_status: constants_1.bcConstants.status.registration, bc_type: constants_1.bcConstants.type.notice },
            relations: ['user', 'board', 'bscats']
        });
    }
    async findCategoryAll(options, category) {
        const { take, page } = options;
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)([category]) }
        });
        const [results, total] = await this.bcRepository.findAndCount({
            order: { bc_createdAt: 'DESC' },
            where: (qb) => {
                qb.where('bscat_bcat_idx = :bcat_idx', { bcat_idx: bcats[0].bcat_idx });
                qb.andWhere('bc_status = :bc_status', { bc_status: constants_1.bcConstants.status.registration });
                qb.andWhere('bc_type IN (:bc_type)', { bc_type: this.getNoneNoticeType() });
            },
            relations: ['user', 'board', 'bscats'],
            take: take,
            skip: take * (page - 1)
        });
        return {
            bcats: bcats,
            bc: new paginate_1.Pagination({
                results,
                total,
            })
        };
    }
    async findNoticeCategoryAll(category) {
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)([category]) }
        });
        return await this.bcRepository.find({
            order: { bc_createdAt: 'DESC' },
            where: (qb) => {
                qb.where('bscat_bcat_idx = :bcat_idx', { bcat_idx: bcats[0].bcat_idx });
                qb.andWhere('bc_status = :bc_status', { bc_status: constants_1.bcConstants.status.registration });
                qb.andWhere('bc_type = :bc_type', { bc_type: constants_1.bcConstants.type.notice });
            },
            relations: ['user', 'board', 'bscats'],
        });
    }
    async findOne(idx) {
        const bc = await this.bcRepository.findOne({
            where: { bc_idx: idx },
            relations: ['user', 'board', 'bscats']
        });
        if (!bc) {
            throw new common_1.NotFoundException('존재하지 않는 게시글 입니다.');
        }
        if (bc['bc_status'] !== constants_1.bcConstants.status.registration) {
            throw new common_1.NotAcceptableException('접근 할 수 없는 게시글 입니다.');
        }
        return bc;
    }
    update(id, updateBoardContentDto) {
        return `This action updates a #${id} boardContent`;
    }
    remove(id) {
        return `This action removes a #${id} boardContent`;
    }
    async saveBoardContent(relation, createBoardContentDto) {
        const addPrefixBcDto = common_utils_1.commonUtils.addPrefix(constants_1.bcConstants.prefix, createBoardContentDto);
        const bc = Object.assign(Object.assign({ bc_bd_idx: relation.board.bd_idx, bc_user_idx: relation.user.user_idx, bc_status: constants_1.bcConstants.status.registration }, addPrefixBcDto), relation);
        const newBc = await this.bcRepository.save(bc);
        return await this.bcRepository.save(newBc);
    }
    getPrivateColumn() {
        const userPrivateColumn = this.usersService.getPrivateColumn();
        return [
            ...constants_1.bcConstants.privateColumn,
            ...userPrivateColumn
        ];
    }
    getNoneNoticeType() {
        const arr = [];
        arr.push(constants_1.bcConstants.type.basic);
        arr.push(constants_1.bcConstants.type.secret);
        arr.push(constants_1.bcConstants.type.link);
        return arr;
    }
};
BoardContentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_content_entity_1.BoardContentsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        boards_service_1.BoardsService,
        board_selected_categories_service_1.BoardSelectedCategoriesService,
        board_categories_service_1.BoardCategoriesService])
], BoardContentsService);
exports.BoardContentsService = BoardContentsService;
//# sourceMappingURL=board-contents.service.js.map