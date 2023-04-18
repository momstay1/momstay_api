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
exports.CreateAdminUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAdminUserDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '회원 타입' }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '상태<br>(0:회원 삭제, 1: 회원 미인증, 2: 회원 등록, 5: 회원 휴면, 9: 회원 탈퇴)' }),
    __metadata("design:type", Number)
], CreateAdminUserDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, swagger_1.ApiProperty)({ description: '아이디' }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/),
    (0, swagger_1.ApiProperty)({ description: '비밀번호' }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, swagger_1.ApiProperty)({ description: '이름' }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiPropertyOptional)({ description: '이메일' }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ description: '국가번호' }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "countryCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ description: '연락처' }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ description: '생일' }),
    __metadata("design:type", Date)
], CreateAdminUserDto.prototype, "birthday", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ description: '가입언어' }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ description: '성별' }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ description: '직장 또는 학교' }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "other", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '회원 메모', required: false }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "memo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '회원 본인인증 고유키', required: false }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "uniqueKey", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '회원 본인인증 정보 (json형태)', required: false }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "certifiInfo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '회원 마케팅 동의 여부 <br>(1: 비동의, 2: 동의)' }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "marketing", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '회원 그룹' }),
    __metadata("design:type", Number)
], CreateAdminUserDto.prototype, "group", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ format: 'binary', description: '회원 프로필', required: false }),
    __metadata("design:type", String)
], CreateAdminUserDto.prototype, "profile", void 0);
exports.CreateAdminUserDto = CreateAdminUserDto;
//# sourceMappingURL=create-admin-user.dto.js.map