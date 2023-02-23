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
    (0, swagger_1.ApiProperty)({ description: '주문 idx' }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "idx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: `상태<br>
    (1:결제대기, 2:결제완료, 3:배송준비(승인 전), 4:배송중(승인 후), 6:구매확정,<br>
    7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료)`
    }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '아임포트 uid' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "imp_uid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '인앱결제 빌링키' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "billingKey", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '결제 방법(bank, card, trans, vbank)' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "payment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매자명' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "clientName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매자이메일' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "clientEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매자연락처1' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "clientPhone1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매자연락처2' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "clientPhone2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '우편번호' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "inPostCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '주소' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "inAddr1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '상세주소' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "inAddr2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송 이름' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송 연락처1' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipPhone1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송 연락처1' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipPhone2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송 지역' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 우편번호' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipPostCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 주소' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipAddr1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 상세 주소' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipAddr2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 국가' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipNation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 주' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipState", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '배송지 도시' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shipCity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '은행명' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "bank", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '계좌번호' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "account", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '예금주' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "depositer", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '예금주명' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "remitter", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매자 메모' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "ClientMemo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '관리자 메모' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "adminMemo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '구매자회원 idx' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userIdx", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '구매상품(방) idx' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "productOptionIdx", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '구매상품 개수' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "productNum", void 0);
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto.js.map