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
exports.CreateBoardContentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBoardContentDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 상태 0: 삭제, 1:미등록, 2:등록' }),
    __metadata("design:type", String)
], CreateBoardContentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '게시판 타입 1: 공지사항, 2: 일반글 3: 비밀글' }),
    __metadata("design:type", String)
], CreateBoardContentDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '게시판 index' }),
    __metadata("design:type", String)
], CreateBoardContentDto.prototype, "bd_idx", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '회원 idx' }),
    __metadata("design:type", String)
], CreateBoardContentDto.prototype, "user_idx", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '관리자 idx' }),
    __metadata("design:type", String)
], CreateBoardContentDto.prototype, "admin_idx", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 작성자' }),
    __metadata("design:type", String)
], CreateBoardContentDto.prototype, "write_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 제목' }),
    __metadata("design:type", String)
], CreateBoardContentDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 링크 상태' }),
    __metadata("design:type", String)
], CreateBoardContentDto.prototype, "link_status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 링크 주소' }),
    __metadata("design:type", String)
], CreateBoardContentDto.prototype, "link", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 내용' }),
    __metadata("design:type", String)
], CreateBoardContentDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 비밀번호' }),
    __metadata("design:type", String)
], CreateBoardContentDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 카테고리 아이디' }),
    __metadata("design:type", Array)
], CreateBoardContentDto.prototype, "category", void 0);
exports.CreateBoardContentDto = CreateBoardContentDto;
//# sourceMappingURL=create-board-content.dto.js.map