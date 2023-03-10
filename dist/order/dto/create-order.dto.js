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
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '주문 idx', required: false }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "idx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: `상태<br>
    (1:결제대기, 2:결제완료, 3:배송준비, 4:배송중(호스트 승인), 6:구매확정,<br>
    7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료)`, required: false
    }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '아임포트 uid', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "imp_uid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '인앱결제 빌링키(사용X)', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "billingKey", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '결제 방법(bank, card, trans, vbank)', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "payment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '결제 금액', required: false }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매 상품 개수', required: false }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "num", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '입주일', required: false }),
    __metadata("design:type", Object)
], CreateOrderDto.prototype, "startAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '퇴거일', required: false }),
    __metadata("design:type", Object)
], CreateOrderDto.prototype, "endAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매자명', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "clientName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매자이메일', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "clientEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매자연락처1', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "clientPhone1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매자연락처2', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "clientPhone2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '우편번호', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "inPostCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '주소', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "inAddr1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '상세주소', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "inAddr2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송 이름', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송 연락처1', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipPhone1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송 연락처1', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipPhone2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송 지역', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 우편번호', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipPostCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 주소', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipAddr1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 상세 주소', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipAddr2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 국가', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipNation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 주', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipState", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 도시', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipCity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '은행명', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "bank", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '계좌번호', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "account", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '예금주', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "depositer", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '예금주명', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "remitter", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매자 메모', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "memo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '관리자 메모', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "adminMemo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '구매상품(방) idx' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "productOptionIdx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '주문상품 idx', required: false }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "orderProductIdx", void 0);
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto.js.map