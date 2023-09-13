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
exports.AdminOrderTotalController = void 0;
const common_1 = require("@nestjs/common");
const order_total_service_1 = require("./order-total.service");
const swagger_1 = require("@nestjs/swagger");
let AdminOrderTotalController = class AdminOrderTotalController {
    constructor(orderTotalService) {
        this.orderTotalService = orderTotalService;
    }
    async salesStatisticsYear() {
        return await this.orderTotalService.salesStatisticsYear();
    }
    async salesStatisticsMonth(year) {
        return await this.orderTotalService.salesStatisticsMonth(year);
    }
    async salesStatisticsDay(yearMonth) {
        return await this.orderTotalService.salesStatisticsDay(yearMonth);
    }
};
__decorate([
    (0, common_1.Get)('sales_statistics/year/'),
    (0, swagger_1.ApiOperation)({ summary: '관리자_연도별 매출 통계 API' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminOrderTotalController.prototype, "salesStatisticsYear", null);
__decorate([
    (0, common_1.Get)('sales_statistics/month/:year'),
    (0, swagger_1.ApiOperation)({ summary: '관리자_월별 매출 통계 API' }),
    (0, swagger_1.ApiParam)({
        name: 'year',
        description: '검색할 년도',
    }),
    __param(0, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminOrderTotalController.prototype, "salesStatisticsMonth", null);
__decorate([
    (0, common_1.Get)('sales_statistics/day/:yearMonth'),
    (0, swagger_1.ApiOperation)({ summary: '관리자_일별 매출 통계 API' }),
    (0, swagger_1.ApiParam)({
        name: 'yearMonth',
        description: '검색할 년월',
    }),
    __param(0, (0, common_1.Param)('yearMonth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminOrderTotalController.prototype, "salesStatisticsDay", null);
AdminOrderTotalController = __decorate([
    (0, common_1.Controller)('admin/order-total'),
    (0, swagger_1.ApiTags)('총주문 (관리자) API'),
    __metadata("design:paramtypes", [order_total_service_1.OrderTotalService])
], AdminOrderTotalController);
exports.AdminOrderTotalController = AdminOrderTotalController;
//# sourceMappingURL=admin-order-total.controller.js.map