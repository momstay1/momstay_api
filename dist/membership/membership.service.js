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
exports.MembershipService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const membership_history_entity_1 = require("./entities/membership-history.entity");
const moment = require("moment");
const paginate_1 = require("../paginate");
const common_utils_1 = require("../common/common.utils");
const product_service_1 = require("../product/product.service");
const excel_service_1 = require("../excel/excel.service");
const settings_service_1 = require("../settings/settings.service");
const schedule_1 = require("@nestjs/schedule");
const email_service_1 = require("../email/email.service");
const message_service_1 = require("../message/message.service");
const applicationStatus = 1;
const approvalStatus = 2;
const endStatus = 3;
let momstay_url;
let membership_url;
let MembershipService = class MembershipService {
    constructor(membershipHistoryRepository, userService, productService, excelService, emailService, settingsService, messageService) {
        this.membershipHistoryRepository = membershipHistoryRepository;
        this.userService = userService;
        this.productService = productService;
        this.excelService = excelService;
        this.emailService = emailService;
        this.settingsService = settingsService;
        this.messageService = messageService;
        momstay_url = common_utils_1.commonUtils.getStatus('momstay_url');
        membership_url = momstay_url + '/host/membership/complete/?type=';
    }
    async create(userInfo, createMembershipDto) {
        const user = await this.userService.findId(userInfo['id']);
        const products = await this.productService.findAllUser(user['idx']);
        if (products.length <= 0) {
            throw new common_1.NotFoundException('숙소 정보가 없습니다.');
        }
        let status = 0;
        try {
            const membership = await this.findOneLastMembership(user['idx']);
            status = membership['status'];
        }
        catch (error) {
            console.log({ error });
        }
        if (status == applicationStatus) {
            throw new common_1.NotAcceptableException('이미 신청한 멤버십이 존재 합니다.');
        }
        if (status == approvalStatus) {
            throw new common_1.NotAcceptableException('멤버십을 사용중입니다.');
        }
        const mh_data = {
            status: +(0, lodash_1.get)(createMembershipDto, 'status', 1),
            month: (0, lodash_1.get)(createMembershipDto, 'month'),
            depositor: (0, lodash_1.get)(createMembershipDto, 'depositor'),
            user: user,
        };
        const membershipHistoryEntity = await this.membershipHistoryRepository.create(mh_data);
        const membership = await this.membershipHistoryRepository.save(membershipHistoryEntity);
        if (user.email != '') {
            const membershipInfo = await this.settingsService.find('membership');
            const { mail, email_tmpl } = await this.emailService.mailSettings({ type: 'user', group: 'host', code: 'membership', lang: user.language }, {
                membership_month: membership.month,
                membership_price: (0, lodash_1.get)(membershipInfo, ['membership_price_discount_' + membership.month, 'set_value'], 0),
                membership_bank: (0, lodash_1.get)(membershipInfo, ['membership_bank', 'set_value'], ''),
                membership_account: (0, lodash_1.get)(membershipInfo, ['membership_account', 'set_value'], ''),
            });
            if (mail != '' && email_tmpl != '') {
                await this.emailService.sendMail(user.email, mail.title, email_tmpl);
            }
        }
        const site = await this.settingsService.find('site');
        if ((0, lodash_1.get)(site, ['site_info_email', 'set_value'], '')) {
            const { mail, email_tmpl } = await this.emailService.mailSettings({ type: 'user', group: 'admin', code: 'membership', lang: user.language }, {});
            if (mail != '' && email_tmpl != '') {
                await this.emailService.sendMail(site.site_info_email.set_value, mail.title, email_tmpl);
            }
        }
        const settings = await this.settingsService.find('alimtalk_admin_mobile');
        const alimtalk_data = await this.settingsAlimtalkData(membership);
        await this.messageService.send([user.phone], 'host_membershiprequest', alimtalk_data);
        await this.messageService.send([settings.alimtalk_admin_mobile.set_value], 'admin_membershiprequest', alimtalk_data);
        return { membership };
    }
    async findAll(options, search, order) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', [
            applicationStatus,
            approvalStatus,
            endStatus,
        ]);
        const alias = 'membership';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.membershipHistoryRepository
            .createQueryBuilder('membership')
            .leftJoinAndSelect('membership.user', 'user')
            .where((qb) => {
            qb.where('`membership`.status IN (:status)', {
                status: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'status'))
                    ? (0, lodash_1.get)(where, 'status')
                    : [(0, lodash_1.get)(where, 'status')],
            });
            (0, lodash_1.get)(where, 'depositor', '') &&
                qb.andWhere('`membership`.`depositor` LIKE :depositor', {
                    depositor: '%' + (0, lodash_1.get)(where, 'depositor') + '%',
                });
            (0, lodash_1.get)(where, 'name', '') &&
                qb.andWhere('`user`.`name` LIKE :name', {
                    name: '%' + (0, lodash_1.get)(where, 'name') + '%',
                });
            (0, lodash_1.get)(where, 'id', '') &&
                qb.andWhere('`user`.`id` LIKE :id', {
                    id: '%' + (0, lodash_1.get)(where, 'id') + '%',
                });
            (0, lodash_1.get)(where, 'phone', '') &&
                qb.andWhere('`user`.`phone` LIKE :phone', {
                    phone: '%' + (0, lodash_1.get)(where, 'phone') + '%',
                });
            (0, lodash_1.get)(where, 'month', '') &&
                qb.andWhere('`membership`.`month` IN (:month)', {
                    month: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'month'))
                        ? (0, lodash_1.get)(where, 'month')
                        : [(0, lodash_1.get)(where, 'month')],
                });
        })
            .orderBy(order_by)
            .skip(take * (page - 1) || 0)
            .take(take || 10)
            .getManyAndCount();
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data };
    }
    async findOne(idx) {
        const membership = await this.findOneIdx(idx);
        return { membership };
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('멤버십을 조회할 정보가 없습니다.');
        }
        const membership = await this.membershipHistoryRepository.findOne({
            where: { idx: idx },
            relations: ['user'],
        });
        if (!(0, lodash_1.get)(membership, 'idx', '')) {
            throw new common_1.NotFoundException('조회된 멤버십 정보가 없습니다.');
        }
        return membership;
    }
    async findOneLastMembership(userIdx) {
        if (!userIdx) {
            throw new common_1.NotFoundException('멤버십을 조회할 정보가 없습니다.');
        }
        const membership = await this.membershipHistoryRepository.findOne({
            where: {
                user: { idx: userIdx },
            },
            order: { createdAt: 'DESC' },
            relations: ['user'],
        });
        if (!(0, lodash_1.get)(membership, 'idx', '')) {
            throw new common_1.NotFoundException('조회된 멤버십 정보가 없습니다.');
        }
        return membership;
    }
    async findOneUser(userInfo) {
        const user = await this.userService.findId(userInfo['id']);
        const membership = await this.findOneLastMembership(user['idx']);
        return { membership };
    }
    update(id, updateMembershipDto) {
        return `This action updates a #${id} membership`;
    }
    async changeStatus(idx, status) {
        await this.membershipHistoryRepository
            .createQueryBuilder()
            .update()
            .set({ status: status })
            .where(' idx = :idx', { idx: idx })
            .execute();
    }
    async membershipStatusChange(idx, updateMembershipDto) {
        if (!(0, lodash_1.get)(updateMembershipDto, ['status'], '')) {
            throw new common_1.NotAcceptableException('membership.service.membershipStatusChange: 변경 할 상태값이 없습니다.');
        }
        const membershipInfo = await this.findOneIdx(idx);
        if (membershipInfo['status'] == updateMembershipDto['status']) {
            throw new common_1.NotAcceptableException('membership.service.membershipStatusChange: 이미 처리된 상태 입니다.');
        }
        membershipInfo['status'] = (0, lodash_1.get)(updateMembershipDto, 'status');
        membershipInfo['month'] = (0, lodash_1.get)(updateMembershipDto, 'month', membershipInfo['month']);
        let membershipStatus;
        if (updateMembershipDto['status'] == approvalStatus) {
            const start = moment().format('YYYY-MM-DD');
            const end = moment()
                .add(membershipInfo['month'], 'months')
                .format('YYYY-MM-DD');
            membershipInfo['start'] = start;
            membershipInfo['end'] = end;
            const membership = await this.membershipHistoryRepository.save(membershipInfo);
            membershipStatus = '1';
            await this.productService.updateMembership(membership['user']['idx'], membershipStatus);
        }
        else {
            membershipInfo['start'] = null;
            membershipInfo['end'] = null;
            membershipStatus = '0';
        }
        const membership = await this.membershipHistoryRepository.save(membershipInfo);
        await this.productService.updateMembership(membership['user']['idx'], membershipStatus);
        if (membership.user.email != '' && membership.status == approvalStatus) {
            const { mail, email_tmpl } = await this.emailService.mailSettings({ type: 'user', group: 'host', code: 'membership_complete', lang: membership.user.language }, {});
            if (mail != '' && email_tmpl != '') {
                await this.emailService.sendMail(membership.user.email, mail.title, email_tmpl);
            }
            const alimtalk_data = await this.settingsAlimtalkData(membershipInfo);
            await this.messageService.send([membership.user.phone], 'host_membershipconfirmed', alimtalk_data);
        }
        return { membership };
    }
    remove(id) {
        return `This action removes a #${id} membership`;
    }
    async settingsAlimtalkData(membership) {
        const settings = await this.settingsService.find('membership');
        return {
            membership_month: membership.month,
            membership_price: settings['membership_price_discount_' + membership.month].set_value,
            membership_bank: settings.membership_bank.set_value,
            membership_account: settings.membership_account.set_value,
            membership_end_date: membership.end,
            link: membership_url + membership.month,
        };
    }
    async checkMembership() {
        console.log('[cron] checkMembership: ', moment().format('YYYY-MM-DD HH:mm:ss'));
        const today = moment().format('YYYY-MM-DD');
        const memberships = await this.membershipHistoryRepository
            .createQueryBuilder('membership')
            .leftJoinAndSelect('membership.user', 'user')
            .where((qb) => {
            qb.where('`membership`.status = :status', { status: approvalStatus });
            qb.andWhere('`membership`.end < :end', { end: today });
        })
            .getMany();
        console.log('멤버십 종료된 개수: ', memberships.length);
        if (memberships.length > 0) {
            const membershipStatus = '0';
            for (const key in memberships) {
                await this.changeStatus(memberships[key]['idx'], endStatus);
                await this.productService.updateMembership(memberships[key]['user']['idx'], membershipStatus);
            }
        }
    }
    async createExcel(options, search, order) {
        const { data } = await this.findAll(options, search, order);
        if (!data) {
            throw new common_1.NotFoundException('membership.service.excel: 다운로드할 데이터가 없습니다.');
        }
        const membership_price = await this.settingsService.find('membership_price');
        return this.excelService.createExcel(data, {
            type: 'membership',
            settingsData: membership_price,
        });
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 1 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MembershipService.prototype, "checkMembership", null);
MembershipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(membership_history_entity_1.MembershipHistoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        product_service_1.ProductService,
        excel_service_1.ExcelService,
        email_service_1.EmailService,
        settings_service_1.SettingsService,
        message_service_1.MessageService])
], MembershipService);
exports.MembershipService = MembershipService;
//# sourceMappingURL=membership.service.js.map