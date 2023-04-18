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
exports.AdminUserLeaveController = void 0;
const common_1 = require("@nestjs/common");
const user_leave_service_1 = require("./user-leave.service");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
let AdminUserLeaveController = class AdminUserLeaveController {
    constructor(userLeaveService) {
        this.userLeaveService = userLeaveService;
    }
    async findAll(take, page, search, order) {
        const { data } = await this.userLeaveService.findAll({ take, page }, search, order);
        return Object.assign({}, data);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '탈퇴회원 리스트 조회 API',
    }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        description: 'search=id:탈퇴회원 id<br>'
            + 'search=name:이름<br>'
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
], AdminUserLeaveController.prototype, "findAll", null);
AdminUserLeaveController = __decorate([
    (0, common_1.Controller)('admin/user-leave'),
    (0, swagger_1.ApiTags)('탈퇴 회원(관리자) API'),
    __metadata("design:paramtypes", [user_leave_service_1.UserLeaveService])
], AdminUserLeaveController);
exports.AdminUserLeaveController = AdminUserLeaveController;
//# sourceMappingURL=admin-user-leave.controller.js.map