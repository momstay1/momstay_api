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
exports.AdminDashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const dashboard_service_1 = require("./dashboard.service");
let AdminDashboardController = class AdminDashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getUsersDashboard() {
        return await this.dashboardService.getUsersDashboard();
    }
    async getProductDashboard() {
        return await this.dashboardService.getProductDashboard();
    }
    async getOrderDashboard() {
        return await this.dashboardService.getOrderDashboard();
    }
};
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: '관리자_대시보드 회원 정보 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'users_cnt.total_cnt: 총 회원 수(게스트, 호스트 회원만 인원수 체크)<br>'
            + 'users_cnt.guest_cnt: 게스트 회원 수<br>'
            + 'users_cnt.host_cnt: 호스트 회원 수<br>'
            + 'users_cnt.dormant_cnt: 휴면 회원 수<br>'
            + 'users_cnt.new_cnt: 가입 날짜가 오늘인 회원 수<br>'
            + 'users_cnt.new_host_cnt: 호스트로 변경한 날짜가 오늘인 호스트 회원 수<br>'
            + 'users_cnt.new_leave_cnt: 오늘 날짜로 탈퇴한 회원 수<br>',
        schema: {
            example: {
                users_cnt: {
                    total_cnt: 'string',
                    guest_cnt: 'string',
                    host_cnt: 'string',
                    dormant_cnt: 'string',
                    new_cnt: 'string',
                    new_host_cnt: 'string',
                    new_leave_cnt: 'string',
                }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminDashboardController.prototype, "getUsersDashboard", null);
__decorate([
    (0, common_1.Get)('product'),
    (0, swagger_1.ApiOperation)({ summary: '관리자_대시보드 호스트 멤버십 정보 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'total_cnt: 총 멤버십 숙소 개수 (사용중인 상태 숙소만 반영)<br>',
        schema: {
            example: {
                product_cnt: {
                    total_cnt: 'string',
                }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminDashboardController.prototype, "getProductDashboard", null);
__decorate([
    (0, common_1.Get)('order'),
    (0, swagger_1.ApiOperation)({ summary: '관리자_대시보드 게스트 주문 현황 정보 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'order_cnt.payment_cnt: 이번달 결제 상태 주문 개수 <br>'
            + 'order_cnt.cancel_cnt: 이번달 취소완료 상태 주문 개수 <br>'
            + 'order_cnt.confirmed_cnt: 이번달 주문확정 상태 주문 개수 <br>'
            + 'order_total_price.total_pay_price: 이번달 결제완료, 배송중(호스트 승인), 주문확정 상태의 총 가격 <br>'
            + 'reservation.total_cnt: 이번달 방문예약 신청 개수 <br>',
        schema: {
            example: {
                order_cnt: {
                    payment_cnt: 'string',
                    cancel_cnt: 'string',
                    confirmed_cnt: 'string',
                },
                order_total_price: {
                    total_pay_price: 'string'
                },
                reservation_cnt: {
                    total_cnt: 'string'
                }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminDashboardController.prototype, "getOrderDashboard", null);
AdminDashboardController = __decorate([
    (0, common_1.Controller)('admin/dashboard'),
    (0, swagger_1.ApiTags)('대시보드(관리자) API'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], AdminDashboardController);
exports.AdminDashboardController = AdminDashboardController;
//# sourceMappingURL=admin-dashboard.controller.js.map