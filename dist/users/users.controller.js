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
const create_user_dto_1 = require("./dto/create-user.dto");
const local_auth_guard_1 = require("../auth/guards/local-auth.guard");
const auth_service_1 = require("../auth/auth.service");
const lodash_1 = require("lodash");
const swagger_1 = require("@nestjs/swagger");
const response_auth_dto_1 = require("../auth/dto/response-auth.dto");
const response_error_dto_1 = require("../error/dto/response-error.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const response_err_dto_1 = require("../error/dto/response-err.dto");
const profile_user_dto_1 = require("./dto/profile-user.dto");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("./entities/user.entity");
const role_decorator_1 = require("../common/decorator/role.decorator");
const sns_login_user_dto_1 = require("./dto/sns.login-user.dto");
const platform_express_1 = require("@nestjs/platform-express");
const common_file_1 = require("../common/common.file");
const login_service_1 = require("../login/login.service");
const refresh_token_service_1 = require("../refresh-token/refresh-token.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const iamport_service_1 = require("../iamport/iamport.service");
const device_service_1 = require("../device/device.service");
let UsersController = class UsersController {
    constructor(authService, usersService, loginService, refreshTokenService, iamportService, deviceService) {
        this.authService = authService;
        this.usersService = usersService;
        this.loginService = loginService;
        this.refreshTokenService = refreshTokenService;
        this.iamportService = iamportService;
        this.deviceService = deviceService;
    }
    async create(createUserDto, files) {
        const data = await this.usersService.create(createUserDto, files);
        return data;
    }
    async login(user, token, req) {
        const jwt = await this.authService.login(user, '');
        await this.usersService.updateUser(token, user);
        await this.loginService.create(user, req);
        await this.refreshTokenService.insert(user, jwt);
        return jwt;
    }
    async reissued(req) {
        const refreshToken = await this.refreshTokenService.findJwtOne(req.get('authorization'));
        const user = await this.usersService.findIdx(+refreshToken.user_idx);
        const jwt = await this.authService.login(user, '');
        await this.refreshTokenService.insert(user, jwt);
        return jwt;
    }
    async snsLogin(snsLoginUserDto) {
        return this.authService.snsLogin(snsLoginUserDto);
    }
    async emailChk(email, code) {
        await this.usersService.emailChk(email, code);
    }
    async getProfile(user) {
        const data = await this.usersService.findId((0, lodash_1.get)(user, 'id', ''));
        return data;
    }
    async getUniqueKey(uniquekey) {
        const data = await this.usersService.findOne({ uniqueKey: uniquekey });
        return data;
    }
    async loginChk(id) {
        const data = await this.usersService.fineUser(id);
        return data;
    }
    async email(email, type) {
        return await this.usersService.email(email, type);
    }
    async test(id) {
        const data = await this.iamportService.getPaymentByImpUid(id);
    }
    async changePassword(id, password) {
        const data = await this.usersService.chpw(id, password);
        return data;
    }
    async resettingPassword(user, prevpassword, password) {
        const data = await this.usersService.rspw(user, prevpassword, password);
        return data;
    }
    async update(id, updateUserDto, files) {
        const data = await this.usersService.update(id, updateUserDto, files);
        const jwt = await this.authService.login(data['user'], '');
        return Object.assign(Object.assign({}, data), { jwt });
    }
    async leave(id) {
        await this.usersService.leave(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '회원 생성 API' }),
    (0, swagger_1.ApiCreatedResponse)({ type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({ type: response_error_dto_1.ResponseErrorDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'profile', maxCount: 1 },
    ], (0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto,
        Array]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '로그인 API' }),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiBody)({ type: login_user_dto_1.LoginUserDto }),
    (0, swagger_1.ApiCreatedResponse)({ type: response_auth_dto_1.ResponseAuthDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: response_err_dto_1.ResponseErrDto }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)('token')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('reissued'),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'access token 재발급 API',
        description: '헤더에 refresh token 값으로 요청시<br>access token 및 refresh token 재발급'
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "reissued", null);
__decorate([
    (0, common_1.Post)('snslogin'),
    (0, swagger_1.ApiOperation)({ summary: '로그인 API' }),
    (0, swagger_1.ApiBody)({ type: sns_login_user_dto_1.SnsLoginUserDto }),
    (0, swagger_1.ApiCreatedResponse)({ type: response_auth_dto_1.ResponseAuthDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: response_err_dto_1.ResponseErrDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sns_login_user_dto_1.SnsLoginUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "snsLogin", null);
__decorate([
    (0, common_1.Post)('emailckeck'),
    (0, swagger_1.ApiOperation)({ summary: '인증 코드 확인 API' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', description: '이메일' },
                code: { type: 'string', description: '인증코드' },
            }
        }
    }),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "emailChk", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '회원 정보 API' }),
    (0, swagger_1.ApiOkResponse)({ type: profile_user_dto_1.ProfileUserDto }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('uniquekey/:uniquekey'),
    (0, swagger_1.ApiOperation)({ summary: '본인인증시 회원 존재여부 체크 API' }),
    (0, swagger_1.ApiOkResponse)({ type: profile_user_dto_1.ProfileUserDto }),
    __param(0, (0, common_1.Param)('uniquekey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUniqueKey", null);
__decorate([
    (0, common_1.Get)('logincheck/:id'),
    (0, swagger_1.ApiOperation)({ summary: '로그인시 아이디 체크 API' }),
    (0, swagger_1.ApiOkResponse)({ type: profile_user_dto_1.ProfileUserDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginChk", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    (0, swagger_1.ApiOperation)({ summary: '인증 메일 발송 API' }),
    (0, swagger_1.ApiQuery)({
        name: "type",
        description: 'type=[pw|sign]'
    }),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "email", null);
__decorate([
    (0, common_1.Get)('test/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "test", null);
__decorate([
    (0, common_1.Patch)('chpw'),
    (0, swagger_1.ApiOperation)({ summary: '비회원 비밀번호 재설정 API' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', description: '아이디' },
                password: { type: 'string', description: '비밀번호' },
            }
        }
    }),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Patch)('rspw'),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host', 'guest']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '회원 비밀번호 재설정 API' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                prevpassword: { type: 'string', description: '이전 비밀번호' },
                password: { type: 'string', description: '비밀번호' },
            }
        }
    }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)('prevpassword')),
    __param(2, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resettingPassword", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host', 'guest']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'profile', maxCount: 1 },
    ], (0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: '회원 정보 수정 API' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto,
        Array]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('leave/:id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "leave", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('유저 API'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        login_service_1.LoginService,
        refresh_token_service_1.RefreshTokenService,
        iamport_service_1.IamportService,
        device_service_1.DeviceService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map