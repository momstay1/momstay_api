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
exports.UserLeaveService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const paginate_1 = require("../paginate");
const typeorm_2 = require("typeorm");
const user_leave_entity_1 = require("./entities/user-leave.entity");
const constants_1 = require("../users/constants");
let UserLeaveService = class UserLeaveService {
    constructor(userLeaveRepository) {
        this.userLeaveRepository = userLeaveRepository;
    }
    create(createUserLeaveDto) {
        return 'This action adds a new userLeave';
    }
    async leaveUser(user, reason) {
        const leave_data = {
            id: user['id'],
            user_idx: user['idx'],
            reason: reason,
            userInfo: JSON.stringify(user)
        };
        const userLeaveEntity = await this.userLeaveRepository.create(leave_data);
        const userLeave = await this.userLeaveRepository.save(userLeaveEntity);
        return userLeave;
    }
    async findAll(options, search, order) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        const alias = 'users_leave';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.userLeaveRepository.createQueryBuilder('users_leave')
            .leftJoin('users', 'users', '`users`.idx = `users_leave`.user_idx')
            .leftJoinAndSelect('users.group', 'group')
            .where(qb => {
            qb.where('`users`.`status` = :status', { status: constants_1.usersConstant.status.leave });
            (0, lodash_1.get)(where, 'group', '') && qb.andWhere('`users`.groupIdx IN (:group)', { group: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'group')) ? (0, lodash_1.get)(where, 'group') : [(0, lodash_1.get)(where, 'group')] });
            (0, lodash_1.get)(where, 'id', '') && qb.andWhere('`users_leave`.`id` LIKE :id', { id: '%' + where['id'] + '%' });
            (0, lodash_1.get)(where, 'name', '') && qb.andWhere('`users_leave`.`userInfo` LIKE :name', { name: '%' + where['name'] + '%' });
        })
            .orderBy(order_by)
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        for (const key in results) {
            results[key].userInfo = JSON.parse(results[key].userInfo);
        }
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data };
    }
    findOne(id) {
        return `This action returns a #${id} userLeave`;
    }
    update(id, updateUserLeaveDto) {
        return `This action updates a #${id} userLeave`;
    }
    remove(id) {
        return `This action removes a #${id} userLeave`;
    }
};
UserLeaveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_leave_entity_1.UserLeaveEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserLeaveService);
exports.UserLeaveService = UserLeaveService;
//# sourceMappingURL=user-leave.service.js.map