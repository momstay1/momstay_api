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
exports.CreateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateProductDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '숙소 idx' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "idx", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '숙소 상태 (0: 미등록, 1: 미사용, 2: 사용)' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '숙소 유형' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '멤버쉽 유무', default: 0 }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "membership", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사업자 구분 (1: 개인사업자, 2: 법인사업자, 3: 개인)' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "hostBusiness", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '숙소 명' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '우편번호' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "postCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주소' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "addr1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상세주소' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "addr2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '호스트 사용 언어 (KR: 한국어, EN: 영어, JP: 일어, CH: 중국어)', example: "KR,EN", default: "KR" }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '지하철' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "metro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '위도' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '경도' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '대학' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "college", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상세설명' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "detailsKor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상세설명 영어' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "detailsEng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상세설명 일어' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "detailsJpn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상세설명 중국어' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "detailsChn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '회원 idx' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "userIdx", void 0);
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map