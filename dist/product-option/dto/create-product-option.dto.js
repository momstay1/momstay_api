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
exports.CreateProductOptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductOptionDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 idx', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "idx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '게시 상태 <br>(0: 미등록, 1: 미사용, 2: 사용)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 유형', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '투숙 상태<br>(1: 공실, 2: 만실)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "stayStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방문예약 상태<br>(1: 미사용, 2: 사용)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "visitStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '바로결제 상태<br>(1: 미사용, 2: 사용)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 이름', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 이름(영어)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "titleEng", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 이름(일본어)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "titleJpn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 이름(중국어)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "titleChn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 가격', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 달 가격', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "priceMonth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 주 가격', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "priceWeek", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 일 가격', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "priceDay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 소개(한글)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "detailsKor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 소개(영어)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "detailsEng", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 소개(일어)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "detailsJpn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 소개(중국어)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "detailsChn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '숙소 idx', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "productIdx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '방 생활 시설 <br> (ex> 33,34)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "productInfoIdx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '유지될 파일 idx <br> (ex> 33,34)', required: false }),
    __metadata("design:type", String)
], CreateProductOptionDto.prototype, "filesIdx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ format: 'binary', description: '대표 사진', required: false }),
    __metadata("design:type", Array)
], CreateProductOptionDto.prototype, "roomDetailImg", void 0);
exports.CreateProductOptionDto = CreateProductOptionDto;
//# sourceMappingURL=create-product-option.dto.js.map