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
exports.ProfileUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProfileUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '아이디' }),
    __metadata("design:type", Number)
], ProfileUserDto.prototype, "idx", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '아이디' }),
    __metadata("design:type", String)
], ProfileUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름' }),
    __metadata("design:type", String)
], ProfileUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '이메일' }),
    __metadata("design:type", String)
], ProfileUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성날짜' }),
    __metadata("design:type", Date)
], ProfileUserDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정날짜' }),
    __metadata("design:type", Date)
], ProfileUserDto.prototype, "updateddAt", void 0);
exports.ProfileUserDto = ProfileUserDto;
//# sourceMappingURL=profile-user.dto.js.map