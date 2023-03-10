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
exports.CreateCommentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateCommentDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: '댓글 상태 (1: 삭제, 2: 등록)' }),
    __metadata("design:type", Number)
], CreateCommentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '대댓글 부모 idx (첫 댓글인 경우 backend에서 처리)', required: false }),
    __metadata("design:type", Number)
], CreateCommentDto.prototype, "parentIdx", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '댓글 참조할 카테고리 (bc: 게시판)' }),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "category", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: '댓글 참조할 idx' }),
    __metadata("design:type", Number)
], CreateCommentDto.prototype, "foreignIdx", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '댓글 내용' }),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "contents", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '댓글 작성자 명' }),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '비회원 댓글 작성시 비밀번호', required: false }),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: '권한 관련 처리시 사용할 정보(사용X)', required: false }),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "author", void 0);
exports.CreateCommentDto = CreateCommentDto;
//# sourceMappingURL=create-comment.dto.js.map