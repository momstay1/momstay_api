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
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../auth/auth.service");
const response_auth_dto_1 = require("../auth/dto/response-auth.dto");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const local_auth_guard_1 = require("../auth/guards/local-auth.guard");
const common_file_1 = require("../common/common.file");
const role_decorator_1 = require("../common/decorator/role.decorator");
const response_err_dto_1 = require("../error/dto/response-err.dto");
const response_error_dto_1 = require("../error/dto/response-error.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const delete_user_dto_1 = require("./dto/delete-user.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const profile_user_dto_1 = require("./dto/profile-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const users_service_1 = require("./users.service");
const user_entity_1 = require("./entities/user.entity");
let AdminUsersController = class AdminUsersController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async create(createUserDto, files) {
        const user = await this.usersService.create(createUserDto, files);
        return user;
    }
    async login(user) {
        return this.authService.login(user, ['root', 'admin']);
    }
    async findAll(user, take, page, search) {
        const { results, total, pageTotal } = await this.usersService.findAll(user, { take, page }, search);
        return {
            results,
            total,
            pageTotal
        };
    }
    async findId(id) {
        const data = await this.usersService.findId(id);
        return data;
    }
    async update(id, updateUserDto, files) {
        const user = await this.usersService.update(id, updateUserDto, files);
        return user;
    }
    async remove(user_ids) {
        await this.usersService.removes(user_ids);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자_생성 API' }),
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
], AdminUsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '관리자_로그인 API' }),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiBody)({ type: login_user_dto_1.LoginUserDto }),
    (0, swagger_1.ApiCreatedResponse)({ type: response_auth_dto_1.ResponseAuthDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: response_err_dto_1.ResponseErrDto }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiOperation)({ summary: '관리자_회원 리스트 API' }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        description: 'search=group:그룹인덱스1,그룹인덱스2<br>'
            + 'search=id:아이디<br>'
            + 'search=name:이름<br>'
            + 'search=email:이메일<br>'
            + 'search=phone:연락처<br>'
            + 'search=birthday:생일<br>'
            + 'search=createdAt_mte:시작날짜<br>'
            + 'search=createdAt_lte:종료날짜<br>',
        required: false
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, Number, Number, Array]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiOperation)({ summary: '회원 아이디 조회 API' }),
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
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'profile', maxCount: 1 },
    ], (0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto,
        Array]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiOperation)({ summary: '관리자_회원정보삭제 API' }),
    (0, swagger_1.ApiBody)({ type: delete_user_dto_1.DeleteUserDto }),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)('user_ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "remove", null);
AdminUsersController = __decorate([
    (0, common_1.Controller)('admin/users'),
    (0, swagger_1.ApiTags)('관리자 유저 API'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AdminUsersController);
exports.AdminUsersController = AdminUsersController;
//# sourceMappingURL=admin-users.controller.js.map