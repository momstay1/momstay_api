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
const order_service_1 = require("../order/order.service");
const product_service_1 = require("../product/product.service");
const reservation_service_1 = require("../reservation/reservation.service");
const users_service_1 = require("../users/users.service");
const moment = require("moment");
const order_total_service_1 = require("../order-total/order-total.service");
let DashboardService = class DashboardService {
    constructor(adminService, usersService, productService, orderService, orderTotalService, reservationService) {
        this.adminService = adminService;
        this.usersService = usersService;
        this.productService = productService;
        this.orderService = orderService;
        this.orderTotalService = orderTotalService;
        this.reservationService = reservationService;
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
    async getUsersDashboard() {
        const users_cnt = await this.usersService.dashboard();
        return { users_cnt };
    }
    async getProductDashboard() {
        const product_cnt = await this.productService.dashboard();
        return { product_cnt };
    }
    async getOrderDashboard() {
        const month = moment().format('YYYY-MM');
        const order_cnt = await this.orderService.dashboard(month);
        const order_total_price = await this.orderTotalService.dashboard(month);
        const reservation_cnt = await this.reservationService.dashboard(month);
        return { order_cnt, order_total_price, reservation_cnt };
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_users_service_1.AdminUsersService,
        users_service_1.UsersService,
        product_service_1.ProductService,
        order_service_1.OrderService,
        order_total_service_1.OrderTotalService,
        reservation_service_1.ReservationService])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map