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
const excel_service_1 = require("../excel/excel.service");
const typeorm_2 = require("typeorm");
const board_content_entity_1 = require("./entities/board-content.entity");
const constants_1 = require("./constants");
const common_utils_1 = require("../common/common.utils");
const paginate_1 = require("../paginate");
const lodash_1 = require("lodash");
const common_bcrypt_1 = require("../common/common.bcrypt");
const email_service_1 = require("../email/email.service");
const settings_service_1 = require("../settings/settings.service");
const message_service_1 = require("../message/message.service");
const inquiryIdx = 5;
let momstay_admin_url;
let inquiry_admin_url;
let momstay_url;
let inquiry_url;
let BoardContentsService = class BoardContentsService {
    constructor(bcRepository, usersService, boardsService, bscatsService, bcatsService, excelService, emailService, settingsService, messageService) {
        this.bcRepository = bcRepository;
        this.usersService = usersService;
        this.boardsService = boardsService;
        this.bscatsService = bscatsService;
        this.bcatsService = bcatsService;
        this.excelService = excelService;
        this.emailService = emailService;
        this.settingsService = settingsService;
        this.messageService = messageService;
        momstay_admin_url = common_utils_1.commonUtils.getStatus('momstay_admin_url');
        inquiry_admin_url = momstay_admin_url + '/customer/inquiry/details/';
        momstay_url = common_utils_1.commonUtils.getStatus('momstay_url');
        inquiry_url = momstay_url + '/mypage/inquiry/details/';
    }
    async create(userInfo, bc) {
        const board = await this.boardsService.findBoard({ idx: bc.bd_idx });
        const write_auth = board.write_auth.split('|');
        const user = await this.usersService.findId(userInfo.id);
        const writeAuth = await common_utils_1.commonUtils.authCheck(write_auth, (0, lodash_1.get)(user, ['group', 'id']));
        if (writeAuth.length <= 0) {
            throw new common_1.UnauthorizedException('권한이 없습니다.');
        }
        bc.user_idx = (0, lodash_1.get)(user, ['idx']).toString();
        bc.bd_idx = bc.bd_idx;
        const boardContent = await this.saveBoardContent(bc);
        if (bc.category.length) {
            const bcats = await this.bcatsService.searching({
                where: { bcat_id: (0, typeorm_2.In)(bc.category) },
            });
            boardContent.bscats = [];
            for (const key in bcats) {
                boardContent.bscats.push(await this.bscatsService.saveToBscat(bcats[key], boardContent));
            }
        }
        const site = await this.settingsService.find('site');
        if (board.idx == inquiryIdx && (0, lodash_1.get)(site, ['site_ko_email', 'set_value'], '')) {
            const { mail, email_tmpl } = await this.emailService.mailSettings({ type: 'board', group: 'admin', code: 'inquiry', lang: 'ko' }, {
                board_title: board.name
            });
            if (mail != '' && email_tmpl != '') {
                await this.emailService.sendMail(site.site_ko_email.set_value, mail.title, email_tmpl);
            }
            const settings = await this.settingsService.find('alimtalk_admin_mobile');
            const alimtalk_data = {
                link: inquiry_admin_url + boardContent.idx
            };
            await this.messageService.send([settings.alimtalk_admin_mobile.set_value], 'admin_boardinquiry', alimtalk_data);
        }
        return boardContent;
    }
    async statusChange(statusChange) {
        console.log({ statusChange });
        await this.bcRepository
            .createQueryBuilder()
            .update(board_content_entity_1.BoardContentsEntity)
            .set({ status: Number(statusChange.status) })
            .where(' idx IN (:bc_idx)', { bc_idx: statusChange.bc_idxs })
            .execute();
    }
    async statusAnswer(bcIdx, answerContent) {
        const bc = await this.findIndex(bcIdx);
        if (bc['status'] == constants_1.bcConstants.status.answerWait) {
            bc['status'] = constants_1.bcConstants.status.answerComplete;
            await this.bcRepository.save(bc);
            if (bc.board.idx == inquiryIdx && (0, lodash_1.get)(bc, ['user', 'email'], '')) {
                const { mail, email_tmpl } = await this.emailService.mailSettings({ type: 'board', group: 'guest', code: 'inquiry', lang: bc.user.language }, {
                    inquiry_content: bc.content,
                    answer_content: answerContent
                });
                if (mail != '' && email_tmpl != '') {
                    await this.emailService.sendMail(bc.user.email, mail.title, email_tmpl);
                }
                if (bc.user.language == 'ko') {
                    const alimtalk_data = {
                        link: inquiry_url + bc.idx
                    };
                    await this.messageService.send([bc.user.phone], 'guest_boardinquiry', alimtalk_data);
                }
            }
        }
    }
    async commentCountUp(bcIdx) {
        const bc = await this.findIndex(bcIdx);
        bc['commentCount']++;
        await this.bcRepository.save(bc);
    }
    async typeChange(typeChange) {
        console.log({ typeChange });
        await this.bcRepository
            .createQueryBuilder()
            .update(board_content_entity_1.BoardContentsEntity)
            .set({ type: Number(typeChange.type) })
            .where(' idx IN (:bc_idx)', { bc_idx: typeChange.bc_idxs })
            .execute();
    }
    async findCategoryAll(bd_idx, category, options, order, search) {
        const { take, page } = options;
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)([category]) },
        });
        const where = common_utils_1.commonUtils.searchSplit(search);
        const order_by = common_utils_1.commonUtils.orderSplit(order, '');
        order_by['createdAt'] = (0, lodash_1.get)(order_by, ['createdAt'], 'DESC');
        const [results, total] = await this.bcRepository.findAndCount({
            order: order_by,
            where: (qb) => {
                qb.where('`BoardContentsEntity__board`.`idx` = :bd_idx', {
                    bd_idx: bd_idx,
                });
                if ((0, lodash_1.get)(bcats, [0, 'bcat_idx'])) {
                    qb.andWhere('`BoardContentsEntity__bscats`.`bscat_idx` = :bcat_idx', {
                        bcat_idx: bcats[0].bcat_idx,
                    });
                }
                if ((0, lodash_1.get)(where, 'status', '')) {
                    qb.andWhere('`BoardContentsEntity`.`status` IN (:status)', {
                        status: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'status'))
                            ? (0, lodash_1.get)(where, 'status')
                            : [(0, lodash_1.get)(where, 'status')],
                    });
                }
                else {
                    qb.andWhere('`BoardContentsEntity`.`status` = :status', {
                        status: constants_1.bcConstants.status.registration,
                    });
                }
                if ((0, lodash_1.get)(where, 'type', '')) {
                    qb.andWhere('`BoardContentsEntity`.`type` IN (:type)', {
                        type: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'type'))
                            ? (0, lodash_1.get)(where, 'type')
                            : [(0, lodash_1.get)(where, 'type')],
                    });
                }
                else {
                    qb.andWhere('`BoardContentsEntity`.`type` IN (:type)', {
                        type: this.getNoneNoticeType(),
                    });
                }
            },
            relations: ['user', 'board', 'bscats'],
            take: take,
            skip: take * (page - 1),
        });
        return {
            bcats: bcats,
            bc: new paginate_1.Pagination({
                results,
                total,
                page,
            }),
        };
    }
    async findUserCategoryAll(bd_idx, category, options, order, userInfo) {
        const { take, page } = options;
        const user = await this.usersService.findId(userInfo.id);
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)([category]) },
        });
        const order_by = common_utils_1.commonUtils.orderSplit(order, '');
        order_by['createdAt'] = (0, lodash_1.get)(order_by, ['createdAt'], 'DESC');
        const [results, total] = await this.bcRepository.findAndCount({
            order: order_by,
            where: (qb) => {
                qb.where('`BoardContentsEntity__board`.`idx` = :bd_idx', {
                    bd_idx: bd_idx,
                });
                if ((0, lodash_1.get)(bcats, [0, 'bcat_idx'])) {
                    qb.andWhere('`BoardContentsEntity__bscats`.`bscat_idx` = :bcat_idx', {
                        bcat_idx: bcats[0].bcat_idx,
                    });
                }
                qb.andWhere('`BoardContentsEntity`.`status` IN (:status)', {
                    status: [
                        constants_1.bcConstants.status.registration,
                        constants_1.bcConstants.status.answerWait,
                        constants_1.bcConstants.status.answerComplete,
                    ],
                });
                qb.andWhere('`BoardContentsEntity`.`type` IN (:type)', {
                    type: this.getNoneNoticeType(),
                });
                qb.andWhere('`BoardContentsEntity__user`.`idx` IN (:userIdx)', {
                    userIdx: user.idx,
                });
            },
            relations: ['user', 'board', 'bscats'],
            take: take,
            skip: take * (page - 1),
        });
        return {
            bcats: bcats,
            bc: new paginate_1.Pagination({
                results,
                total,
                page,
            }),
        };
    }
    async findNoticeCategoryAll(bd_idx, category) {
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)([category]) },
        });
        return await this.bcRepository.find({
            order: { createdAt: 'DESC' },
            where: (qb) => {
                qb.where('`BoardContentsEntity__board`.`idx` = :bc_bd_idx', {
                    bc_bd_idx: bd_idx,
                });
                if ((0, lodash_1.get)(bcats, [0, 'bcat_idx'])) {
                    qb.andWhere('`BoardContentsEntity__bscats`.`bscat_idx` = :bcat_idx', {
                        bcat_idx: bcats[0].bcat_idx,
                    });
                }
                qb.andWhere('`BoardContentsEntity`.`status` = :bc_status', {
                    bc_status: constants_1.bcConstants.status.registration,
                });
                qb.andWhere('`BoardContentsEntity`.`type` = :bc_type', {
                    bc_type: constants_1.bcConstants.type.notice,
                });
            },
            relations: ['user', 'board', 'bscats'],
        });
    }
    async findOne(bcIdx) {
        const bc = await this.findIndex(bcIdx);
        if ([constants_1.bcConstants.status.delete, constants_1.bcConstants.status.uncertified].includes(bc.status)) {
            throw new common_1.NotAcceptableException('접근 할 수 없는 게시글 입니다.');
        }
        bc.count = await this.countUp(bc.idx, bc.count);
        return bc;
    }
    async findIndex(idx) {
        const bc = await this.bcRepository.findOne({
            where: { idx: idx },
            relations: ['user', 'board', 'bscats'],
        });
        if (!bc) {
            throw new common_1.NotFoundException('존재하지 않는 게시글 입니다.');
        }
        return bc;
    }
    async findBdBcIndex(bcIdx) {
        const bc = await this.bcRepository.findOne({
            where: { idx: bcIdx },
            relations: ['user', 'board', 'bscats'],
        });
        if (!bc) {
            throw new common_1.NotFoundException('존재하지 않는 게시글 입니다.');
        }
        return bc;
    }
    async update(userInfo, bcIdx, updateBoardContentDto) {
        const board = await this.boardsService.findBoard({
            idx: updateBoardContentDto.bd_idx,
        });
        const bc = await this.findIndex(bcIdx);
        const user = await this.usersService.findId(userInfo.id);
        const adminAuth = await common_utils_1.commonUtils.isAdmin((0, lodash_1.get)(user, ['group', 'id']));
        if (!adminAuth) {
            const write_auth = board.write_auth.split('|');
            const user_auth = await common_utils_1.commonUtils.authCheck(write_auth, (0, lodash_1.get)(userInfo, ['group']));
            if (user_auth.length <= 0 ||
                (0, lodash_1.get)(bc, ['user', 'idx']) != (0, lodash_1.get)(user, ['idx'])) {
                throw new common_1.UnauthorizedException('권한이 없습니다.');
            }
        }
        bc.idx = bcIdx;
        bc.status = +(0, lodash_1.get)(updateBoardContentDto, ['status'], 2);
        bc.type = +(0, lodash_1.get)(updateBoardContentDto, ['type'], 1);
        bc.writer = (0, lodash_1.get)(updateBoardContentDto, ['writer'], '');
        bc.title = (0, lodash_1.get)(updateBoardContentDto, ['title'], '');
        bc.link = (0, lodash_1.get)(updateBoardContentDto, ['link'], '');
        bc.linkStatus = (0, lodash_1.get)(updateBoardContentDto, ['linkStatus'], '');
        bc.content = (0, lodash_1.get)(updateBoardContentDto, ['content'], '');
        const boardContent = await this.updateBoardContent(bc);
        if ((0, lodash_1.get)(updateBoardContentDto, ['category', 'length']) > 0) {
            const bcats = await this.bcatsService.searching({
                where: { bcat_id: (0, typeorm_2.In)(updateBoardContentDto.category) },
            });
            boardContent.bscats = await this.bscatsChange(bcats, boardContent);
        }
        return boardContent;
    }
    async countUp(bc_idx, bc_count) {
        await this.bcRepository
            .createQueryBuilder()
            .update(board_content_entity_1.BoardContentsEntity)
            .set({ count: ++bc_count })
            .where(' idx IN (:bc_idx)', { bc_idx: [bc_idx] })
            .execute();
        return bc_count;
    }
    async adminFindCategoryAll(bd_idx, category, options, search, order) {
        const { take, page } = options;
        const bcats = await this.bcatsService.searching({
            where: { bcat_id: (0, typeorm_2.In)([category]) },
        });
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', this.getNoneDelStatus());
        console.log({ where });
        const alias = 'bc';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        console.log({ order_by });
        const [results, total] = await this.bcRepository
            .createQueryBuilder('bc')
            .leftJoinAndSelect('bc.user', 'user')
            .leftJoinAndSelect('bc.board', 'board')
            .leftJoinAndSelect('bc.bscats', 'bscats')
            .leftJoinAndSelect('user.group', 'group')
            .where((qb) => {
            qb.where('`board`.idx = :bd_idx', { bd_idx: bd_idx });
            qb.andWhere('`bc`.status IN (:status)', {
                status: (0, lodash_1.isArray)(where['status'])
                    ? where['status']
                    : [where['status']],
            });
            (0, lodash_1.get)(where, 'name', '') &&
                qb.andWhere('`user`.name LIKE :name', {
                    name: '%' + where['name'] + '%',
                });
            (0, lodash_1.get)(where, 'id', '') &&
                qb.andWhere('`user`.id LIKE :id', { id: '%' + where['id'] + '%' });
        })
            .orderBy(order_by)
            .skip(take * (page - 1) || 0)
            .take(take || 10)
            .getManyAndCount();
        return {
            bcats: bcats,
            bc: new paginate_1.Pagination({
                results,
                total,
                page,
            }),
        };
    }
    async bscatsChange(updateBscats, bc) {
        const bscats = [];
        const deleteBscats = [];
        const bcats = (0, lodash_1.keyBy)(updateBscats, (o) => {
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
        const bc = Object.assign({ user: (0, lodash_1.get)(createBoardContentDto, ['user_idx']), board: (0, lodash_1.get)(createBoardContentDto, ['bd_idx'], 0) }, createBoardContentDto);
        if ((0, lodash_1.get)(createBoardContentDto, ['password'])) {
            bc.bc_password = await common_bcrypt_1.commonBcrypt.setBcryptPassword((0, lodash_1.get)(createBoardContentDto, 'password'));
        }
        const newBc = await this.bcRepository.save(bc);
        return await this.bcRepository.save(newBc);
    }
    async updateBoardContent(updateBoardContentDto) {
        const bc = Object.assign({ user: (0, lodash_1.get)(updateBoardContentDto, ['user_idx']), board: (0, lodash_1.get)(updateBoardContentDto, ['bd_idx'], 0) }, updateBoardContentDto);
        if ((0, lodash_1.get)(updateBoardContentDto, ['password'])) {
            bc.bc_password = await common_bcrypt_1.commonBcrypt.setBcryptPassword((0, lodash_1.get)(updateBoardContentDto, 'password'));
        }
        const newBc = await this.bcRepository.save(bc);
        return await this.bcRepository.save(newBc);
    }
    getPrivateColumn() {
        const userPrivateColumn = this.usersService.getPrivateColumn();
        return [
            ...constants_1.bcConstants.privateColumn,
            ...userPrivateColumn,
        ];
    }
    getNoneNoticeType() {
        const arr = [];
        arr.push(constants_1.bcConstants.type.basic);
        arr.push(constants_1.bcConstants.type.secret);
        arr.push(constants_1.bcConstants.type.link);
        arr.push(constants_1.bcConstants.type.event);
        arr.push(constants_1.bcConstants.type.new);
        return arr;
    }
    getNoneDelStatus() {
        const arr = [];
        arr.push(constants_1.bcConstants.status.uncertified);
        arr.push(constants_1.bcConstants.status.registration);
        arr.push(constants_1.bcConstants.status.answerWait);
        arr.push(constants_1.bcConstants.status.answerComplete);
        return arr;
    }
    async createExcel(bd_idx, category, options, search, order) {
        const boardContents = await this.adminFindCategoryAll(bd_idx, category, options, search, order);
        if (!boardContents) {
            throw new common_1.NotFoundException('board-contents.service.excel: 다운로드할 데이터가 없습니다.');
        }
        return this.excelService.createExcel(boardContents['bc'], {
            type: `board_${bd_idx}`,
        });
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
        excel_service_1.ExcelService,
        email_service_1.EmailService,
        settings_service_1.SettingsService,
        message_service_1.MessageService])
], BoardContentsService);
exports.BoardContentsService = BoardContentsService;
//# sourceMappingURL=board-contents.service.js.map