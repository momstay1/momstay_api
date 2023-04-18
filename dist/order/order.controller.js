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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async create(user, createOrderDto, req) {
        return await this.orderService.create(user, createOrderDto, req);
    }
    async iamportNoti(iamportNoti, req) {
        console.log({ req });
        console.log({ iamportNoti });
    }
    async test(order_idx, price) {
    }
    async guestFindAll(user, take, page, search, order) {
        return await this.orderService.guestFindAll(user, { take, page }, search, order);
    }
    async hostFindAll(user, take, page, search, order) {
        return await this.orderService.hostFindAll(user, { take, page }, search, order);
    }
    async findOneIdxByGuest(user, idx) {
        return await this.orderService.findOneIdxByGuest(user, +idx);
    }
    async findOneIdxByHost(user, idx) {
        return await this.orderService.findOneIdxByHost(user, +idx);
    }
    async findOneCodeByNonmember(code) {
        return await this.orderService.findOneCodeByNonmember(code);
    }
    async hostOrderApproval(user, code) {
        await this.orderService.hostOrderApproval(code, user);
    }
    async guestOrderCancel(user, code) {
        await this.orderService.guestOrderCancel(code, user);
    }
    async hostOrderCancel(user, code, updateOrderDto) {
        await this.orderService.hostOrderCancel(code, user, updateOrderDto);
    }
    remove(id) {
        return this.orderService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '주문 생성 API',
        description: '최초 실행시 productOptionIdx값만 입력<br>' +
            '최초 실행 이후 idx(order idx), price(가격), startAt(입주일), endAt(퇴거일), orderProductIdx값 입력<br>' +
            '주문 완료시 status: 2, imp_uid: 아임포트 고유번호 값 입력<br>' +
            '주문 상태가 0이 아니고 1이상인 주문인 경우 예외 처리<br>' +
            'status 값이 2일때 imp_uid값 없는 경우 예외 처리<br>',
    }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity,
        create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('iamport/noti'),
    (0, swagger_1.ApiOperation)({ summary: 'iamport 결제 후 콜백 API(작업중)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "iamportNoti", null);
__decorate([
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiOperation)({ summary: '테스트' }),
    __param(0, (0, common_1.Query)('order_idx')),
    __param(1, (0, common_1.Query)('price')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "test", null);
__decorate([
    (0, common_1.Get)('guest'),
    (0, swagger_1.ApiOperation)({
        summary: '게스트 주문 리스트 조회 API',
        description: '관리자 계정 로그인 상태에서 리스트 조회시 다른 사람의 주문 내역 확인 가능<br>' +
            '호스트, 게스트 계정 로그인 상태에서 리스트 조회시 자신의 주문 내역만 확인 가능<br>',
    }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: '' +
            'search=status:상태검색 (1:결제대기, 2:결제완료, 3:배송준비, 4:배송중(호스트 승인), 6:구매확정,<br>' +
            '7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료))<br>' +
            'search=code:주문코드검생<br>' +
            'search=imp_uid:아임포트 고유 아이디 검색<br>' +
            'search=payment:결제방법 검색(bank, card, trans, vbank)<br>' +
            'search=clientName:주문자명 검색<br>',
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
], OrderController.prototype, "guestFindAll", null);
__decorate([
    (0, common_1.Get)('host'),
    (0, swagger_1.ApiOperation)({
        summary: '호스트 주문 리스트 조회 API',
        description: '관리자 계정 로그인 상태에서 리스트 조회시 다른 사람의 주문 내역 확인 가능<br>' +
            '호스트 계정 로그인 상태에서 리스트 조회시 자신의 숙소 주문 내역만 확인 가능<br>' +
            '게스트는 권한 없음',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: '' +
            'search=status:상태검색 (1:결제대기, 2:결제완료, 3:배송준비, 4:배송중(호스트 승인), 6:구매확정,<br>' +
            '7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료))<br>' +
            'search=code:주문코드검생<br>' +
            'search=imp_uid:아임포트 고유 아이디 검색<br>' +
            'search=payment:결제방법 검색(bank, card, trans, vbank)<br>' +
            'search=clientName:주문자명 검색<br>',
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
], OrderController.prototype, "hostFindAll", null);
__decorate([
    (0, common_1.Get)('guest/:idx'),
    (0, swagger_1.ApiOperation)({
        summary: '게스트 주문 상세 조회 API',
        description: '게스트가 바로결제한 주문의 상세 조회 모든 계정 조회 가능<br>' +
            '자신이 바로결제한 주문만 조회 가능<br>' +
            '관리자 계정의 경우 모든 계정의 주문 상세 조회 가능',
    }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOneIdxByGuest", null);
__decorate([
    (0, common_1.Get)('host/:idx'),
    (0, swagger_1.ApiOperation)({
        summary: '호스트 주문 상세 조회 API',
        description: '호스트가 관리하는 숙소의 상세 조회 자신의 숙소 주문 상세만 조회 가능<br>' +
            '게스트 계정은 권한 없음<br>' +
            '관리자 계정의 경우 모든 주문 상세 조회 가능',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOneIdxByHost", null);
__decorate([
    (0, common_1.Get)('nonmember/:code'),
    (0, swagger_1.ApiOperation)({ summary: '비회원 주문 상세 조회 API' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOneCodeByNonmember", null);
__decorate([
    (0, common_1.Patch)('host/:code'),
    (0, swagger_1.ApiOperation)({ summary: '호스트 주문 승인 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(204),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "hostOrderApproval", null);
__decorate([
    (0, common_1.Delete)('/guest/:code'),
    (0, swagger_1.ApiOperation)({ summary: '게스트 주문 취소 API' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(204),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "guestOrderCancel", null);
__decorate([
    (0, common_1.Delete)('host/:code'),
    (0, swagger_1.ApiOperation)({ summary: '호스트 주문 거절 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(204),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "hostOrderCancel", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "remove", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, swagger_1.ApiTags)('주문 API'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map