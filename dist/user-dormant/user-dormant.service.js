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
exports.UserDormantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const paginate_1 = require("../paginate");
const typeorm_2 = require("typeorm");
const user_dormant_entity_1 = require("./entities/user-dormant.entity");
const constants_1 = require("../users/constants");
let UserDormantService = class UserDormantService {
    constructor(userDormantRepository) {
        this.userDormantRepository = userDormantRepository;
    }
    create(createUserDormantDto) {
        return 'This action adds a new userDormant';
    }
    async findAll(options, search, order) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        const alias = 'users_dormant';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.userDormantRepository.createQueryBuilder('users_dormant')
            .leftJoin('users', 'users', '`users`.id = `users_dormant`.id')
            .leftJoinAndSelect('users.group', 'group')
            .where(qb => {
            qb.where('`users`.`status` = :status', { status: constants_1.usersConstant.status.dormant });
            (0, lodash_1.get)(where, 'group', '') && qb.andWhere('`users`.groupIdx IN (:group)', { group: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'group')) ? (0, lodash_1.get)(where, 'group') : [(0, lodash_1.get)(where, 'group')] });
            (0, lodash_1.get)(where, 'id', '') && qb.andWhere('`users_dormant`.`id` LIKE :id', { id: '%' + where['id'] + '%' });
            (0, lodash_1.get)(where, 'name', '') && qb.andWhere('`users`.`name` LIKE :name', { name: '%' + where['name'] + '%' });
            (0, lodash_1.get)(where, 'email', '') && qb.andWhere('`users`.`email` LIKE :email', { email: '%' + where['email'] + '%' });
            (0, lodash_1.get)(where, 'phone', '') && qb.andWhere('`users`.`phone` LIKE :phone', { phone: '%' + where['phone'] + '%' });
            (0, lodash_1.get)(where, 'language', '') && qb.andWhere('`users`.`language` IN (:language)', { language: (0, lodash_1.isArray)(where['language']) ? where['language'] : [where['language']] });
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
    async findOneId(id) {
        if (!id) {
            throw new common_1.NotFoundException('userDormant.service.findOneId: 조회할 정보가 없습니다.');
        }
        const dormantUser = await this.userDormantRepository.findOne({
            where: { id: id },
        });
        if (!(0, lodash_1.get)(dormantUser, 'idx', '')) {
            throw new common_1.NotFoundException('userDormant.service.findOneId: 존재하지 않는 휴면회원 입니다.');
        }
        return dormantUser;
    }
    update(id, updateUserDormantDto) {
        return `This action updates a #${id} userDormant`;
    }
    async remove(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('userDormant.service.remove: 삭제할 정보가 없습니다.');
        }
        await this.userDormantRepository.createQueryBuilder()
            .delete()
            .where({ idx: idx })
            .execute();
    }
    async dormantUser(user) {
        const dormant_data = {
            id: user['id'],
            userInfo: JSON.stringify(user)
        };
        const userDormantEntity = await this.userDormantRepository.create(dormant_data);
        const userDormant = await this.userDormantRepository.save(userDormantEntity);
        return userDormant;
    }
};
UserDormantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_dormant_entity_1.UserDormantEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserDormantService);
exports.UserDormantService = UserDormantService;
//# sourceMappingURL=user-dormant.service.js.map