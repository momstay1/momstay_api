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
const class_validator_1 = require("class-validator");
class CreateProductDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '숙소 idx', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "idx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '숙소 상태 <br>(0: 미등록, 1: 미사용, 2: 사용)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '숙소 유형', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '멤버쉽 유무(0: 미사용, 1: 사용)', default: 0, required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "membership", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '사업자 구분 <br>(1: 개인사업자, 2: 법인사업자, 3: 개인)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "hostBusiness", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '숙소 명', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '숙소 명(영어)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "titleEng", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '숙소 명(일본어)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "titleJpn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '숙소 명(중국어)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "titleChn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '우편번호', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "postCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '주소', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "addr1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '주소(영어)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "addr1Eng", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '주소(일본어)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "addr1Jpn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '주소(중국어)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "addr1Chn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '상세주소', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "addr2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '상세주소(영어)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "addr2Eng", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '상세주소(일본어)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "addr2Jpn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '상세주소(중국어)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "addr2Chn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '호스트 사용 언어 <br>(KR: 한국어, EN: 영어, JP: 일어, CH: 중국어)', example: "KR,EN", default: "KR", required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '지하철', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "metro", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '위도', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '경도', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "lng", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '대학', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "college", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '상세설명', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "detailsKor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '상세설명 영어', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "detailsEng", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '상세설명 일어', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "detailsJpn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '상세설명 중국어', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "detailsChn", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '회원 idx' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "userIdx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '유지될 파일 idx <br> (ex> 33,34)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "filesIdx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '생활 및 편의 <br> (ex> 33,34)', required: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "productInfoIdx", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ format: 'binary', description: '대표 사진', required: false }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "lodgingDetailImg", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ format: 'binary', description: '식사 서비스 사진', required: false }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "mealsImg", void 0);
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map