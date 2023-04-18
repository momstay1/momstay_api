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
exports.AdminReservationController = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const fs_1 = require("fs");
let AdminReservationController = class AdminReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async findAll(user, take, page, search, order) {
        const { data, file_info } = await this.reservationService.findAll(user, { take, page }, search, order);
        return Object.assign(Object.assign({}, data), { file_info });
    }
    async adminStatusChange(status, idxs) {
        return await this.reservationService.adminChangeStatus(+status, idxs);
    }
    async excelDownload(user, take, page, search, order, res) {
        const excel_file = await this.reservationService.createExcel(user, { take, page }, search, order);
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="' + excel_file.file_name + '"',
        });
        (0, fs_1.createReadStream)(excel_file.file_path).pipe(res);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '방문 예약 리스트 (관리자) API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: 'search=status:1,2,4,5<br>방문예약 상태 (1: 예약대기, 2: 예약승인, 3: 예약확정, 4: 예약취소, 5: 예약거부)<br>' +
            'search=po_title:방 이름<br>' +
            'search=name:예약자명<br>' +
            'search=email:예약자 이메일<br>' +
            'search=id:예약자 아이디<br>' +
            'search=min_visit_date:예약일<br>' +
            'search=max_visit_date:예약일<br>',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'order',
        description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
        required: false,
    }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, Number, Number, Array, String]),
    __metadata("design:returntype", Promise)
], AdminReservationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiOperation)({
        summary: '방문 예약 상태 변경(관리자) API',
        description: 'status: 상태값<br>idxs: 방문예약 idx 배열<br>' +
            '방문예약 상태 (1: 예약대기, 2: 예약승인, 3: 예약확정, 4: 예약취소, 5: 예약거부)',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                status: { type: 'string' },
                idxs: { example: [] },
            },
        },
    }),
    __param(0, (0, common_1.Body)('status')),
    __param(1, (0, common_1.Body)('idxs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], AdminReservationController.prototype, "adminStatusChange", null);
__decorate([
    (0, common_1.Get)('excel'),
    (0, swagger_1.ApiOperation)({ summary: '방문 예약 리스트 (관리자) 엑셀 다운로드 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: 'search=status:1,2,4,5<br>방문예약 상태 (1: 예약대기, 2: 예약승인, 3: 예약확정, 4: 예약취소, 5: 예약거부)<br>' +
            'search=po_title:방 이름<br>' +
            'search=name:예약자명<br>' +
            'search=email:예약지 이메일<br>' +
            'search=min_visit_date:예약일<br>' +
            'search=max_visit_date:예약일<br>',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'order',
        description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
        required: false,
    }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('order')),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, Number, Number, Array, String, Object]),
    __metadata("design:returntype", Promise)
], AdminReservationController.prototype, "excelDownload", null);
AdminReservationController = __decorate([
    (0, common_1.Controller)('admin/reservation'),
    (0, swagger_1.ApiTags)('방문 예약(관리자) API'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], AdminReservationController);
exports.AdminReservationController = AdminReservationController;
//# sourceMappingURL=admin-reservation.controller.js.map