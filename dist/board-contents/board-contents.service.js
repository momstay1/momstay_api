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
const admin_users_service_1 = require("../admin-users/admin-users.service");
const common_bcrypt_1 = require("../common/common.bcrypt");
let BoardContentsService = class BoardContentsService {
    constructor(bcRepository, usersService, boardsService, bscatsService, bcatsService, AdminService) {
        this.bcRepository = bcRepository;
        this.usersService = usersService;
        this.boardsService = boardsService;
        this.bscatsService = bscatsService;
        this.bcatsService = bcatsService;
        this.AdminService = AdminService;
    }
    async create(userInfo, bc) {
        const board = await this.boardsService.findBoard({ bd_idx: bc.bd_idx });
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)(bc.category) }
        });
        const write_auth = board.bd_write_auth.split("|");
        if (!['root', 'admin'].includes(userInfo.user_group)) {
            const user = await this.usersService.findOne(userInfo.user_id);
            if (!write_auth.includes((0, lodash_1.get)(user, ['user_group', 'grp_id']))) {
                throw new common_1.UnauthorizedException('권한이 없습니다.');
            }
            bc.user_idx = (0, lodash_1.get)(user, ['user_idx']).toString();
        }
        else {
            const admin = await this.AdminService.findOne(userInfo.user_id);
            bc.admin_idx = (0, lodash_1.get)(admin, ['admin_idx']).toString();
        }
        bc.bd_idx = bc.bd_idx;
        const boardContent = await this.saveBoardContent(bc);
        boardContent.bscats = [];
        for (const key in bcats) {
            boardContent.bscats.push(await this.bscatsService.saveToBscat(bcats[key], boardContent));
        }
        return boardContent;
    }
    async statusChange(statusChange) {
        console.log({ statusChange });
        await this.bcRepository.createQueryBuilder()
            .update(board_content_entity_1.BoardContentsEntity)
            .set({ bc_status: Number(statusChange.status) })
            .where(" bc_idx IN (:bc_idx)", { bc_idx: statusChange.bc_idxs })
            .execute();
    }
    async findCategoryAll(idx, category, options) {
        const { take, page } = options;
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)([category]) }
        });
        const [results, total] = await this.bcRepository.findAndCount({
            order: { bc_createdAt: 'DESC' },
            where: (qb) => {
                qb.where('bc_bd_idx = :bc_bd_idx', { bc_bd_idx: idx });
                if ((0, lodash_1.get)(bcats, [0, 'bcat_idx'])) {
                    qb.andWhere('bscat_bcat_idx = :bcat_idx', { bcat_idx: bcats[0].bcat_idx });
                }
                qb.andWhere('bc_status = :bc_status', { bc_status: constants_1.bcConstants.status.registration });
                qb.andWhere('bc_type IN (:bc_type)', { bc_type: this.getNoneNoticeType() });
            },
            relations: ['user', 'board', 'bscats', 'admin'],
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
    async findNoticeCategoryAll(bd_idx, category) {
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)([category]) }
        });
        return await this.bcRepository.find({
            order: { bc_createdAt: 'DESC' },
            where: (qb) => {
                qb.where('bc_bd_idx = :bc_bd_idx', { bc_bd_idx: bd_idx });
                if ((0, lodash_1.get)(bcats, [0, 'bcat_idx'])) {
                    qb.andWhere('bscat_bcat_idx = :bcat_idx', { bcat_idx: bcats[0].bcat_idx });
                }
                qb.andWhere('bc_status = :bc_status', { bc_status: constants_1.bcConstants.status.registration });
                qb.andWhere('bc_type = :bc_type', { bc_type: constants_1.bcConstants.type.notice });
            },
            relations: ['user', 'board', 'bscats', 'admin'],
        });
    }
    async findOne(bc_idx) {
        const bc = await this.findIndex(bc_idx);
        if (bc.bc_status !== constants_1.bcConstants.status.registration) {
            throw new common_1.NotAcceptableException('접근 할 수 없는 게시글 입니다.');
        }
        bc.bc_count = await this.countUp(bc.bc_idx, bc.bc_count);
        return bc;
    }
    async findIndex(idx) {
        const bc = await this.bcRepository.findOne({
            where: { bc_idx: idx },
            relations: ['user', 'board', 'bscats', 'admin']
        });
        if (!bc) {
            throw new common_1.NotFoundException('존재하지 않는 게시글 입니다.');
        }
        return bc;
    }
    async findBdBcIndex(bd_idx, bc_idx) {
        const bc = await this.bcRepository.findOne({
            where: { bc_bd_idx: bd_idx, bc_idx: bc_idx },
            relations: ['user', 'board', 'bscats', 'admin']
        });
        if (!bc) {
            throw new common_1.NotFoundException('존재하지 않는 게시글 입니다.');
        }
        return bc;
    }
    async update(userInfo, bc_idx, updateBoardContentDto) {
        const board = await this.boardsService.findBoard({ bd_idx: updateBoardContentDto.bd_idx });
        const bc = await this.findIndex(bc_idx);
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)(updateBoardContentDto.category) }
        });
        const write_auth = board.bd_write_auth.split("|");
        if (!['root', 'admin'].includes(userInfo.user_group)) {
            const user = await this.usersService.findOne(userInfo.user_id);
            if (!write_auth.includes((0, lodash_1.get)(userInfo, ['user_group', 'grp_id']))
                || (0, lodash_1.get)(bc, ['user', 'user_idx']) != (0, lodash_1.get)(user, ['user_idx'])) {
                throw new common_1.UnauthorizedException('권한이 없습니다.');
            }
        }
        bc.bc_idx = bc_idx;
        bc.bc_status = +(0, lodash_1.get)(updateBoardContentDto, ['status'], 2);
        bc.bc_type = +(0, lodash_1.get)(updateBoardContentDto, ['type'], 1);
        bc.bc_write_name = (0, lodash_1.get)(updateBoardContentDto, ['write_name'], '');
        bc.bc_title = (0, lodash_1.get)(updateBoardContentDto, ['title'], '');
        bc.bc_link = (0, lodash_1.get)(updateBoardContentDto, ['link'], '');
        bc.bc_content = (0, lodash_1.get)(updateBoardContentDto, ['content'], '');
        const boardContent = await this.updateBoardContent(bc);
        boardContent.bscats = await this.bscatsChange(bcats, boardContent);
        return boardContent;
    }
    async countUp(bc_idx, bc_count) {
        await this.bcRepository.createQueryBuilder()
            .update(board_content_entity_1.BoardContentsEntity)
            .set({ bc_count: ++bc_count })
            .where(" bc_idx IN (:bc_idx)", { bc_idx: [bc_idx] })
            .execute();
        return bc_count;
    }
    async adminFindCategoryAll(idx, category, options) {
        const { take, page } = options;
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)([category]) }
        });
        const [results, total] = await this.bcRepository.findAndCount({
            order: { bc_createdAt: 'DESC' },
            where: (qb) => {
                qb.where('bc_bd_idx = :bc_bd_idx', { bc_bd_idx: idx });
                if ((0, lodash_1.get)(bcats, [0, 'bcat_idx'])) {
                    qb.andWhere('bscat_bcat_idx = :bcat_idx', { bcat_idx: bcats[0].bcat_idx });
                }
            },
            relations: ['user', 'board', 'bscats', 'admin'],
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
    async bscatsChange(updateBscats, bc) {
        const bscats = [];
        const deleteBscats = [];
        const bcats = (0, lodash_1.keyBy)(updateBscats, o => {
            return o.bcat_idx;
        });
        for (const key in bc.bscats) {
            if (bcats[bc.bscats[key].bscat_bcat_idx]) {
                delete bcats[bc.bscats[key].bscat_bcat_idx];
            }
            else {
                deleteBscats.push(bc.bscats[key].bscat_idx);
            }
        }
        if (deleteBscats.length > 0) {
            this.bscatsService.removes(deleteBscats);
        }
        for (const key in bcats) {
            bscats.push(await this.bscatsService.saveToBscat(bcats[key], bc));
        }
        return bscats;
    }
    async saveBoardContent(createBoardContentDto) {
        const addPrefixBcDto = common_utils_1.commonUtils.addPrefix(constants_1.bcConstants.prefix, createBoardContentDto);
        const bc = Object.assign({ user: (0, lodash_1.get)(createBoardContentDto, ['user_idx']), admin: (0, lodash_1.get)(createBoardContentDto, ['admin_idx']), board: (0, lodash_1.get)(createBoardContentDto, ['bd_idx'], 0) }, addPrefixBcDto);
        if ((0, lodash_1.get)(createBoardContentDto, ['password'])) {
            bc.bc_password = await common_bcrypt_1.commonBcrypt.setBcryptPassword((0, lodash_1.get)(createBoardContentDto, 'password'));
        }
        const newBc = await this.bcRepository.save(bc);
        return await this.bcRepository.save(newBc);
    }
    async updateBoardContent(updateBoardContentDto) {
        const bc = Object.assign({ user: (0, lodash_1.get)(updateBoardContentDto, ['user_idx']), admin: (0, lodash_1.get)(updateBoardContentDto, ['admin_idx']), board: (0, lodash_1.get)(updateBoardContentDto, ['bd_idx'], 0) }, updateBoardContentDto);
        if ((0, lodash_1.get)(updateBoardContentDto, ['password'])) {
            bc.bc_password = await common_bcrypt_1.commonBcrypt.setBcryptPassword((0, lodash_1.get)(updateBoardContentDto, 'password'));
        }
        const newBc = await this.bcRepository.save(bc);
        return await this.bcRepository.save(newBc);
    }
    getPrivateColumn() {
        const userPrivateColumn = this.usersService.getPrivateColumn();
        const adminPrivateColumn = this.AdminService.getAdminPrivateColumn();
        return [
            ...constants_1.bcConstants.privateColumn,
            ...userPrivateColumn,
            ...adminPrivateColumn
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
        board_categories_service_1.BoardCategoriesService,
        admin_users_service_1.AdminUsersService])
], BoardContentsService);
exports.BoardContentsService = BoardContentsService;
//# sourceMappingURL=board-contents.service.js.map