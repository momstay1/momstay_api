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
exports.AdminUserDormantController = void 0;
const common_1 = require("@nestjs/common");
const user_dormant_service_1 = require("./user-dormant.service");
const create_user_dormant_dto_1 = require("./dto/create-user-dormant.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
let AdminUserDormantController = class AdminUserDormantController {
    constructor(userDormantService) {
        this.userDormantService = userDormantService;
    }
    create(createUserDormantDto) {
        return this.userDormantService.create(createUserDormantDto);
    }
    async findAll(take, page, search, order) {
        const { data } = await this.userDormantService.findAll({ take, page }, search, order);
        return Object.assign({}, data);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dormant_dto_1.CreateUserDormantDto]),
    __metadata("design:returntype", void 0)
], AdminUserDormantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '휴면회원 리스트 조회 API',
    }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        description: 'search=id:휴면회원 id<br>'
            + 'search=name:휴면회원 이름<br>'
            + 'search=email:휴면회원 이메일<br>'
            + 'search=phone:휴면회원 연락처<br>'
            + 'search=language:가입언어<br>'
            + 'search=group:그룹idx<br>',
        required: false
    }),
    (0, swagger_1.ApiQuery)({
        name: "order",
        description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
        required: false
    }),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, String]),
    __metadata("design:returntype", Promise)
], AdminUserDormantController.prototype, "findAll", null);
AdminUserDormantController = __decorate([
    (0, common_1.Controller)('admin/user-dormant'),
    (0, swagger_1.ApiTags)('휴면 회원(관리자) API'),
    __metadata("design:paramtypes", [user_dormant_service_1.UserDormantService])
], AdminUserDormantController);
exports.AdminUserDormantController = AdminUserDormantController;
//# sourceMappingURL=admin-user-dormant.controller.js.map