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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_user_entity_1 = require("../admin-users/entities/admin-user.entity");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const role_decorator_1 = require("../common/decorator/role.decorator");
const dashboard_service_1 = require("./dashboard.service");
const create_dashboard_dto_1 = require("./dto/create-dashboard.dto");
const update_dashboard_dto_1 = require("./dto/update-dashboard.dto");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    create(createDashboardDto) {
        return this.dashboardService.create(createDashboardDto);
    }
    findAll() {
        return this.dashboardService.findAll();
    }
    async getUsersDashboard(user) {
        return await this.dashboardService.usersCount(user);
    }
    findOne(id) {
        return this.dashboardService.findOne(+id);
    }
    update(id, updateDashboardDto) {
        return this.dashboardService.update(+id, updateDashboardDto);
    }
    remove(id) {
        return this.dashboardService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dashboard_dto_1.CreateDashboardDto]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiOperation)({ summary: '관리자_대시보드 회원 정보 API' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            example: {
                total_cnt: 'number',
                admin_cnt: 'number',
                users_cnt: 'number'
            }
        }
    }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_user_entity_1.AdminUsersEntity]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getUsersDashboard", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dashboard_dto_1.UpdateDashboardDto]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "remove", null);
DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    (0, swagger_1.ApiTags)('관리자 대시보드 API'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map