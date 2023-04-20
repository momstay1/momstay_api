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
exports.CreatePopupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreatePopupDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: '팝업 사용 상태 (1: 사용안함, 2: 사용)' }),
    __metadata("design:type", Number)
], CreatePopupDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '팝업 아이디', required: true }),
    __metadata("design:type", String)
], CreatePopupDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '팝업명', required: true }),
    __metadata("design:type", String)
], CreatePopupDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '노출 페이지', required: false }),
    __metadata("design:type", String)
], CreatePopupDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/),
    (0, swagger_1.ApiProperty)({ description: '팝업 노출 시작일', required: false }),
    __metadata("design:type", String)
], CreatePopupDto.prototype, "startPeriod", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/),
    (0, swagger_1.ApiProperty)({ description: '팝업 노출 종료일', required: false }),
    __metadata("design:type", String)
], CreatePopupDto.prototype, "endPeriod", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '팝업 노출 순위', required: false }),
    __metadata("design:type", Number)
], CreatePopupDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '팝업 링크', required: false }),
    __metadata("design:type", String)
], CreatePopupDto.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        format: 'binary',
        description: '팝업 사진 (최대 1장)',
        required: true,
    }),
    __metadata("design:type", Array)
], CreatePopupDto.prototype, "popupImg", void 0);
exports.CreatePopupDto = CreatePopupDto;
//# sourceMappingURL=create-popup.dto.js.map