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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const admin_users_service_1 = require("../admin-users/admin-users.service");
const users_service_1 = require("../users/users.service");
let DashboardService = class DashboardService {
    constructor(adminService, usersService) {
        this.adminService = adminService;
        this.usersService = usersService;
    }
    create(createDashboardDto) {
        return 'This action adds a new dashboard';
    }
    findAll() {
        return `This action returns all dashboard`;
    }
    findOne(id) {
        return `This action returns a #${id} dashboard`;
    }
    update(id, updateDashboardDto) {
        return `This action updates a #${id} dashboard`;
    }
    remove(id) {
        return `This action removes a #${id} dashboard`;
    }
    async usersCount(user) {
        const admin_cnt = await this.adminService.count(user);
        const users_cnt = await this.usersService.count();
        return {
            total_cnt: admin_cnt + users_cnt,
            admin_cnt,
            users_cnt,
        };
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_users_service_1.AdminUsersService,
        users_service_1.UsersService])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map