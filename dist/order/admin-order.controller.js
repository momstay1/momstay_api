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
exports.AdminOrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const fs_1 = require("fs");
let AdminOrderController = class AdminOrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async guestFindAll(user, take, page, search, order) {
        return await this.orderService.adminFindAll(user, { take, page }, search, order);
    }
    async excelDownload(user, take, page, search, order, res) {
        const excel_file = await this.orderService.createExcel(user, { take, page }, search, order);
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="' + excel_file.file_name + '"',
        });
        (0, fs_1.createReadStream)(excel_file.file_path).pipe(res);
    }
    async findOneIdxByAdmin(idx) {
        return await this.orderService.findOneIdxByAdmin(+idx);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '게스트 주문 리스트 조회 API',
        description: '관리자 계정 로그인 상태에서 리스트 조회시 다른 사람의 주문 내역 확인 가능<br>' +
            '호스트, 게스트 계정 로그인 상태에서 리스트 조회시 자신의 주문 내역만 확인 가능<br>',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: '' +
            'search=status:상태검색 (1:결제대기, 2:결제완료, 3:배송준비, 4:배송중(호스트 승인), 6:구매확정,<br>' +
            '7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료))<br>' +
            'search=code:주문코드검색<br>' +
            'search=imp_uid:아임포트 고유 아이디 검색<br>' +
            'search=payment:결제방법 검색(bank, card, trans, vbank)<br>' +
            'search=productTitle:방 이름 검색<br>' +
            'search=clientName:주문자명 검색<br>' +
            'search=clientId:주문자아이디 검색<br>' +
            'search=min_paiedAt:최소 결제일<br>' +
            'search=max_paiedAt:최대 결제일<br>',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({ name: 'order', required: false }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, Number, Number, Array, String]),
    __metadata("design:returntype", Promise)
], AdminOrderController.prototype, "guestFindAll", null);
__decorate([
    (0, common_1.Get)('excel'),
    (0, swagger_1.ApiOperation)({
        summary: '게스트 주문 리스트 엑셀 다운로드 API',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: '' +
            'search=status:상태검색 (1:결제대기, 2:결제완료, 3:배송준비, 4:배송중(호스트 승인), 6:구매확정,<br>' +
            '7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료))<br>' +
            'search=code:주문코드검색<br>' +
            'search=imp_uid:아임포트 고유 아이디 검색<br>' +
            'search=payment:결제방법 검색(bank, card, trans, vbank)<br>' +
            'search=productTitle:방 이름 검색<br>' +
            'search=clientName:주문자명 검색<br>' +
            'search=clientId:주문자아이디 검색<br>' +
            'search=min_paiedAt:최소 결제일<br>' +
            'search=max_paiedAt:최대 결제일<br>',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({ name: 'order', required: false }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('order')),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, Number, Number, Array, String, Object]),
    __metadata("design:returntype", Promise)
], AdminOrderController.prototype, "excelDownload", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, swagger_1.ApiOperation)({
        summary: '주문 상세 조회 API',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminOrderController.prototype, "findOneIdxByAdmin", null);
AdminOrderController = __decorate([
    (0, common_1.Controller)('admin/order'),
    (0, swagger_1.ApiTags)('주문(관리자) API'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], AdminOrderController);
exports.AdminOrderController = AdminOrderController;
//# sourceMappingURL=admin-order.controller.js.map