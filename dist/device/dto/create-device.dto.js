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
exports.CreateDeviceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDeviceDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '토큰 정보', required: false }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '앱 버전', required: false }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "appVersion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '운영체제 정보', required: false }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "os", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '운영체제 버전', required: false }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "osVersion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '접속 환경 (android | ios | web)' }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "environment", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '마케팅 정보 수신 동의 여부 (1: 비동의, 2: 동의)' }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "marketing", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '서비스 정보 수신 동의 여부 (1: 비동의, 2: 동의)' }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "service", void 0);
exports.CreateDeviceDto = CreateDeviceDto;
//# sourceMappingURL=create-device.dto.js.map