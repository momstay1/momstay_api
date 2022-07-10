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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const local_auth_guard_1 = require("../auth/guards/local-auth.guard");
const auth_service_1 = require("../auth/auth.service");
const common_utils_1 = require("../common/common.utils");
const lodash_1 = require("lodash");
const swagger_1 = require("@nestjs/swagger");
const response_auth_dto_1 = require("../auth/dto/response-auth.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const response_err_dto_1 = require("../error/dto/response-err.dto");
const profile_user_dto_1 = require("./dto/profile-user.dto");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("./entities/user.entity");
const role_decorator_1 = require("../common/decorator/role.decorator");
let UsersController = class UsersController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    sanitizeUsers(user) {
        return common_utils_1.commonUtils.sanitizeEntity(user, this.usersService.getPrivateColumn());
    }
    ;
    async login(user) {
        return this.authService.login(user);
    }
    async getProfile(user) {
        const data = await this.usersService.findOne((0, lodash_1.get)(user, 'user_id', ''));
        return this.sanitizeUsers(data);
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '로그인 API' }),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiBody)({ type: login_user_dto_1.LoginUserDto }),
    (0, swagger_1.ApiCreatedResponse)({ type: response_auth_dto_1.ResponseAuthDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: response_err_dto_1.ResponseErrDto }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, role_decorator_1.Auth)(['basic']),
    (0, swagger_1.ApiOperation)({ summary: '회원 정보 API' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: profile_user_dto_1.ProfileUserDto }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('유저 API'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map