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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
const create_reservation_dto_1 = require("./dto/create-reservation.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let ReservationController = class ReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async create(user, createReservationDto) {
        return await this.reservationService.create(user, createReservationDto);
    }
    async hostFindAll(user, take, page) {
        const { data, file_info } = await this.reservationService.hostFindAll({ take, page }, user);
        return Object.assign(Object.assign({}, data), { file_info });
    }
    async guestFindAll(user, take, page) {
        const { data, file_info } = await this.reservationService.guestFindAll({ take, page }, user);
        return Object.assign(Object.assign({}, data), { file_info });
    }
    async findOne(idx) {
        return await this.reservationService.findOne(+idx);
    }
    async guestConfirmation(user, idx) {
        return await this.reservationService.guestConfirmation(user, +idx);
    }
    async hostApproval(user, idx) {
        return await this.reservationService.hostApproval(user, +idx);
    }
    async update(user, idx) {
        return await this.reservationService.update(user, +idx);
    }
    async guestCancel(user, idx) {
        return await this.reservationService.guestCancel(user, +idx);
    }
    async hostCancel(user, idx) {
        return await this.reservationService.hostCancel(user, +idx);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '방문 예약 등록 API',
        description: '상태값 (1:대기, 2:승인, 4:취소(게스트), 5:거절(호스트))'
    }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host', 'guest']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity,
        create_reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/host'),
    (0, swagger_1.ApiOperation)({ summary: '방문 예약 리스트 (호스트) API' }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, Number, Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "hostFindAll", null);
__decorate([
    (0, common_1.Get)('/guest'),
    (0, swagger_1.ApiOperation)({ summary: '방문 예약 리스트 (게스트) API' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, Number, Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "guestFindAll", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '방문 예약 상세 API' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('guest/:idx'),
    (0, swagger_1.ApiOperation)({ summary: '방문 예약 확정(게스트) API' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "guestConfirmation", null);
__decorate([
    (0, common_1.Patch)('host/:idx'),
    (0, swagger_1.ApiOperation)({ summary: '방문 예약 승인(호스트) API' }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "hostApproval", null);
__decorate([
    (0, common_1.Patch)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '방문 예약 승인(호스트) API (제거 예정)' }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('guest/:idx'),
    (0, swagger_1.ApiOperation)({ summary: '방문 예약 취소(게스트) API' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "guestCancel", null);
__decorate([
    (0, common_1.Delete)('host/:idx'),
    (0, swagger_1.ApiOperation)({ summary: '방문 예약 거절(호스트) API' }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "hostCancel", null);
ReservationController = __decorate([
    (0, common_1.Controller)('reservation'),
    (0, swagger_1.ApiTags)('방문 예약 API'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
exports.ReservationController = ReservationController;
//# sourceMappingURL=reservation.controller.js.map