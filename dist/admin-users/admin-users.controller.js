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
exports.AdminUsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
const auth_service_1 = require("../auth/auth.service");
const response_auth_dto_1 = require("../auth/dto/response-auth.dto");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const common_utils_1 = require("../common/common.utils");
const role_decorator_1 = require("../common/decorator/role.decorator");
const response_err_dto_1 = require("../error/dto/response-err.dto");
const response_error_dto_1 = require("../error/dto/response-error.dto");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const login_user_dto_1 = require("../users/dto/login-user.dto");
const profile_user_dto_1 = require("../users/dto/profile-user.dto");
const update_user_dto_1 = require("../users/dto/update-user.dto");
const users_service_1 = require("../users/users.service");
const admin_users_service_1 = require("./admin-users.service");
const admin_user_entity_1 = require("./entities/admin-user.entity");
let AdminUsersController = class AdminUsersController {
    constructor(authService, adminUsersService, usersService) {
        this.authService = authService;
        this.adminUsersService = adminUsersService;
        this.usersService = usersService;
    }
    sanitizeUsers(admin) {
        return common_utils_1.commonUtils.sanitizeEntity(admin, this.adminUsersService.getPrivateColumn());
    }
    ;
    sanitizeAdmin(admin) {
        return common_utils_1.commonUtils.sanitizeEntity(admin, this.adminUsersService.getAdminPrivateColumn());
    }
    ;
    async create(createUserDto) {
        const user = await this.adminUsersService.create(createUserDto);
        return user;
    }
    async login(id, password) {
        return this.authService.admin_login(id, password);
    }
    async findAll(take, page) {
        const { results, total, pageTotal } = await this.usersService.findAll({ take, page });
        return {
            results: (0, lodash_1.map)(results, (obj) => {
                return this.sanitizeUsers(obj);
            }),
            total,
            pageTotal
        };
    }
    async getProfile(user) {
        const data = await this.adminUsersService.findOne((0, lodash_1.get)(user, 'user_id', ''));
        return this.sanitizeAdmin(data);
    }
    async findId(id) {
        const data = await this.usersService.findOne(id);
        return this.sanitizeUsers(data);
    }
    async update(id, updateUserDto) {
        const user = await this.usersService.update(id, updateUserDto);
        return this.sanitizeUsers(user);
    }
    async remove(body) {
        await this.usersService.removes(body.ids);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiOperation)({ summary: '관리자_생성 API' }),
    (0, swagger_1.ApiCreatedResponse)({ type: response_auth_dto_1.ResponseAuthDto }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({ type: response_error_dto_1.ResponseErrorDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '관리자_로그인 API' }),
    (0, swagger_1.ApiBody)({ type: login_user_dto_1.LoginUserDto }),
    (0, swagger_1.ApiCreatedResponse)({ type: response_auth_dto_1.ResponseAuthDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: response_err_dto_1.ResponseErrDto }),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiOperation)({ summary: '관리자_회원 리스트 API' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiOperation)({ summary: '관리자_정보 API' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: profile_user_dto_1.ProfileUserDto }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_user_entity_1.AdminUsersEntity]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiOperation)({ summary: '관리자_회원상세정보 API' }),
    (0, swagger_1.ApiOkResponse)({ type: profile_user_dto_1.ProfileUserDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "findId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiOperation)({ summary: '관리자_회원정보수정 API' }),
    (0, swagger_1.ApiOkResponse)({ type: profile_user_dto_1.ProfileUserDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiOperation)({ summary: '관리자_회원정보삭제 API' }),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "remove", null);
AdminUsersController = __decorate([
    (0, common_1.Controller)('admin-users'),
    (0, swagger_1.ApiTags)('관리자 유저 API'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        admin_users_service_1.AdminUsersService,
        users_service_1.UsersService])
], AdminUsersController);
exports.AdminUsersController = AdminUsersController;
//# sourceMappingURL=admin-users.controller.js.map