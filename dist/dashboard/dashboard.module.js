"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
const admin_dashboard_controller_1 = require("./admin-dashboard.controller");
const admin_users_module_1 = require("../admin-users/admin-users.module");
const users_module_1 = require("../users/users.module");
const product_module_1 = require("../product/product.module");
const order_module_1 = require("../order/order.module");
const reservation_module_1 = require("../reservation/reservation.module");
const order_total_module_1 = require("../order-total/order-total.module");
let DashboardModule = class DashboardModule {
};
DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            admin_users_module_1.AdminUsersModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
            order_total_module_1.OrderTotalModule,
            reservation_module_1.ReservationModule,
        ],
        controllers: [admin_dashboard_controller_1.AdminDashboardController],
        providers: [dashboard_service_1.DashboardService]
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map