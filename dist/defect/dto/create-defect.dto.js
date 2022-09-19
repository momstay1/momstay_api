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
exports.CreateDefectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDefectDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '현장 idx' }),
    __metadata("design:type", String)
], CreateDefectDto.prototype, "place_idx", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '동' }),
    __metadata("design:type", String)
], CreateDefectDto.prototype, "sort1", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '호수' }),
    __metadata("design:type", String)
], CreateDefectDto.prototype, "sort2", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '위치' }),
    __metadata("design:type", String)
], CreateDefectDto.prototype, "sort3", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '작업상태' }),
    __metadata("design:type", String)
], CreateDefectDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '하자유형' }),
    __metadata("design:type", String)
], CreateDefectDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '내용' }),
    __metadata("design:type", String)
], CreateDefectDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '작업방법' }),
    __metadata("design:type", String)
], CreateDefectDto.prototype, "work_method", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '교체면적(m)' }),
    __metadata("design:type", String)
], CreateDefectDto.prototype, "replacement_square_meter", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '교체면적(장)' }),
    __metadata("design:type", String)
], CreateDefectDto.prototype, "dft_replacement_sheet", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '사진촬영일' }),
    __metadata("design:type", String)
], CreateDefectDto.prototype, "shooting_day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '원본 이미지' }),
    __metadata("design:type", Object)
], CreateDefectDto.prototype, "dft_origin_img", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정보 표시된 이미지' }),
    __metadata("design:type", Object)
], CreateDefectDto.prototype, "dft_info_img", void 0);
exports.CreateDefectDto = CreateDefectDto;
//# sourceMappingURL=create-defect.dto.js.map