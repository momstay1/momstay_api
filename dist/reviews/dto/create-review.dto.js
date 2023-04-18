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
exports.CreateReviewDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateReviewDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: '후기 상태 (-1: 삭제, 1: 미등록, 2: 등록)' }),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '답글 후기의 idx (첫 후기인 경우 backend에서 처리)', required: false }),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "group", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '후기의 depth (기본값 0, 답글 후기인 경우의 값 1)', required: false }),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "depth", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: '평점 (1 ~ 10)' }),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "star", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: '숙소 idx' }),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "productIdx", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '후기 내용' }),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "contents", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/),
    (0, swagger_1.ApiProperty)({ description: '입주일' }),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "start", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/),
    (0, swagger_1.ApiProperty)({ description: '퇴거일' }),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "end", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ format: 'binary', description: '후기 사진', required: false }),
    __metadata("design:type", Array)
], CreateReviewDto.prototype, "reviewImg", void 0);
exports.CreateReviewDto = CreateReviewDto;
//# sourceMappingURL=create-review.dto.js.map