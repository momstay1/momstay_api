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
exports.AdminUsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const groups_service_1 = require("../groups/groups.service");
const constants_1 = require("../users/constants");
const typeorm_2 = require("typeorm");
const admin_user_entity_1 = require("./entities/admin-user.entity");
let AdminUsersService = class AdminUsersService {
    constructor(adminRepository, groupService) {
        this.adminRepository = adminRepository;
        this.groupService = groupService;
    }
    getPrivateColumn() {
        return constants_1.usersConstant.privateColumn;
    }
    getAdminPrivateColumn() {
        return constants_1.usersConstant.adminPrivateColumn;
    }
    async create(createUserDto) {
        const user = await this.checkAdminExists(createUserDto.id);
        if (user) {
            throw new common_1.UnprocessableEntityException('아이디가 중복 됩니다.');
        }
        return await this.saveAdmin(createUserDto);
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.NotFoundException('존재하지 않는 아이디 입니다.');
        }
        const user = await this.adminRepository.findOne({
            where: { admin_id: id },
            relations: ['admin_group'],
        });
        if (!user) {
            throw new common_1.NotFoundException('존재하지 않는 아이디 입니다.');
        }
        return user;
    }
    async count(user) {
        const group = await this.groupService.findOneName(user.user_group);
        return await this.adminRepository.count({
            where: {
                admin_status: constants_1.usersConstant.status.registration,
                admin_group: (0, typeorm_2.MoreThanOrEqual)(group.grp_idx)
            }
        });
    }
    async checkAdminExists(id) {
        return await this.adminRepository.findOne({ admin_id: id });
    }
    async saveAdmin(createUserDto) {
        const addPrefixAdminDto = common_utils_1.commonUtils.addPrefix(constants_1.usersConstant.adminPrefix, createUserDto);
        addPrefixAdminDto.admin_group = (0, lodash_1.get)(createUserDto, 'group', constants_1.usersConstant.admin.group_idx);
        const admin = await this.adminRepository.create(Object.assign({}, addPrefixAdminDto));
        return await this.adminRepository.save(admin);
    }
};
AdminUsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_user_entity_1.AdminUsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        groups_service_1.GroupsService])
], AdminUsersService);
exports.AdminUsersService = AdminUsersService;
//# sourceMappingURL=admin-users.service.js.map