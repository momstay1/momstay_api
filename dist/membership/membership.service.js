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
const schedule_1 = require("@nestjs/schedule");
const applicationStatus = 1;
const approvalStatus = 2;
const endStatus = 3;
let MembershipService = class MembershipService {
    constructor(membershipHistoryRepository, userService, productService) {
        this.membershipHistoryRepository = membershipHistoryRepository;
        this.userService = userService;
        this.productService = productService;
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
        return { membership };
    }
    async findAll(options, search, order) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', [1, 2, 3]);
        const alias = 'membership';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.membershipHistoryRepository.createQueryBuilder('membership')
            .leftJoinAndSelect('membership.user', 'user')
            .where(qb => {
            qb.where('`membership`.status IN (:status)', { status: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'status')) ? (0, lodash_1.get)(where, 'status') : [(0, lodash_1.get)(where, 'status')] });
            ((0, lodash_1.get)(where, 'depositor', '')) && qb.andWhere('`membership`.`depositor` = :depositor', { depositor: (0, lodash_1.get)(where, 'depositor') });
            ((0, lodash_1.get)(where, 'month', '')) && qb.andWhere('`membership`.`month` IN (:month)', { month: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'month')) ? (0, lodash_1.get)(where, 'month') : [(0, lodash_1.get)(where, 'month')] });
        })
            .orderBy(order_by)
            .skip((take * (page - 1) || 0))
            .take((take || 10))
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
            relations: ['user']
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
                user: { idx: userIdx }
            },
            order: { createdAt: 'DESC' },
            relations: ['user']
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
        await this.membershipHistoryRepository.createQueryBuilder()
            .update()
            .set({ status: status })
            .where(" idx = :idx", { idx: idx })
            .execute();
    }
    async membershipApproval(idx, updateMembershipDto) {
        const membershipInfo = await this.findOneIdx(idx);
        if (membershipInfo['status'] == approvalStatus) {
            throw new common_1.NotAcceptableException('이미 처리 완료된 멤버십입니다.');
        }
        membershipInfo['status'] = (0, lodash_1.get)(updateMembershipDto, 'status', approvalStatus);
        membershipInfo['month'] = (0, lodash_1.get)(updateMembershipDto, 'month', membershipInfo['month']);
        const start = moment().format('YYYY-MM-DD');
        const end = moment().add(membershipInfo['month'], 'months').format('YYYY-MM-DD');
        membershipInfo['start'] = start;
        membershipInfo['end'] = end;
        const membership = await this.membershipHistoryRepository.save(membershipInfo);
        const membershipStatus = '1';
        await this.productService.updateMembership(membership['user']['idx'], membershipStatus);
        return { membership };
    }
    remove(id) {
        return `This action removes a #${id} membership`;
    }
    async checkMembership() {
        console.log('[cron] checkMembership: ', moment().format('YYYY-MM-DD HH:mm:ss'));
        const today = moment().format('YYYY-MM-DD');
        const memberships = await this.membershipHistoryRepository.createQueryBuilder('membership')
            .leftJoinAndSelect('membership.user', 'user')
            .where(qb => {
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
        product_service_1.ProductService])
], MembershipService);
exports.MembershipService = MembershipService;
//# sourceMappingURL=membership.service.js.map