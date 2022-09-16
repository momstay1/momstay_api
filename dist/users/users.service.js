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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_bcrypt_1 = require("../common/common.bcrypt");
const common_utils_1 = require("../common/common.utils");
const groups_service_1 = require("../groups/groups.service");
const paginate_1 = require("../paginate");
const typeorm_2 = require("typeorm");
const constants_1 = require("./constants");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository, groupService) {
        this.usersRepository = usersRepository;
        this.groupService = groupService;
    }
    async create(createUserDto) {
        const user = await this.checkUserExists(createUserDto.id);
        if (user) {
            throw new common_1.UnprocessableEntityException('아이디가 중복 됩니다.');
        }
        return await this.saveUser(createUserDto);
        ;
    }
    async findAll(options) {
        const status_arr = [];
        for (const key in constants_1.usersConstant.status) {
            if (key != 'delete') {
                status_arr.push(constants_1.usersConstant.status[key]);
            }
        }
        const { take, page } = options;
        const [results, total] = await this.usersRepository.findAndCount({
            order: { user_createdAt: 'DESC' },
            where: { user_status: (0, typeorm_2.In)(status_arr) },
            relations: ['user_group'],
            take: take,
            skip: take * (page - 1)
        });
        return new paginate_1.Pagination({
            results,
            total,
        });
    }
    async count() {
        return await this.usersRepository.count({ where: { user_status: constants_1.usersConstant.status.registration } });
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const user = await this.usersRepository.findOne({
            where: { user_id: id },
            relations: ['user_group'],
        });
        if (!user) {
            throw new common_1.NotFoundException('존재하지 않는 아이디 입니다.');
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        let group_idx = (0, lodash_1.get)(updateUserDto, 'group', constants_1.usersConstant.default.group_idx);
        if ((0, lodash_1.get)(updateUserDto, 'group') == "1") {
            group_idx = constants_1.usersConstant.default.group_idx;
        }
        const group = await this.groupService.findOne(Number(group_idx));
        user.user_name = updateUserDto.name;
        user.user_status = +(0, lodash_1.get)(updateUserDto, 'status', constants_1.usersConstant.status.registration);
        user.user_email = (0, lodash_1.get)(updateUserDto, 'email', '');
        user.user_phone = (0, lodash_1.get)(updateUserDto, 'phone', '');
        user.user_memo = (0, lodash_1.get)(updateUserDto, 'memo', '');
        user.user_place_idx = +(0, lodash_1.get)(updateUserDto, 'place_idx', 0);
        user.user_group = group;
        if ((0, lodash_1.get)(updateUserDto, 'password')) {
            user.user_password = await common_bcrypt_1.commonBcrypt.setBcryptPassword((0, lodash_1.get)(updateUserDto, 'password'));
        }
        return await this.usersRepository.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        user.user_status = constants_1.usersConstant.status.delete;
        await this.usersRepository.save(user);
    }
    async removes(user_ids) {
        if (user_ids.length <= 0) {
            throw new common_1.NotFoundException('삭제할 정보가 없습니다.');
        }
        await this.usersRepository.createQueryBuilder()
            .update(user_entity_1.UsersEntity)
            .set({ user_status: Number(constants_1.usersConstant.status.delete) })
            .where(" user_id IN (:user_ids)", { user_ids: user_ids })
            .execute();
    }
    getPrivateColumn() {
        return constants_1.usersConstant.privateColumn;
    }
    async saveUser(createUserDto) {
        const addPrefixUserDto = common_utils_1.commonUtils.addPrefix(constants_1.usersConstant.prefix, createUserDto);
        addPrefixUserDto.user_group = createUserDto.group ? createUserDto.group : constants_1.usersConstant.default.group_idx;
        addPrefixUserDto.user_status = createUserDto.status ? +createUserDto.status : constants_1.usersConstant.status.registration;
        const user = await this.usersRepository.create(Object.assign({}, addPrefixUserDto));
        return await this.usersRepository.save(user);
    }
    async checkUserExists(id) {
        return await this.usersRepository.findOne({ user_id: id });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        groups_service_1.GroupsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map