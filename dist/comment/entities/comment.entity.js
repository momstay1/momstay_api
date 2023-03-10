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
exports.CommentEntity = void 0;
const common_bcrypt_1 = require("../../common/common.bcrypt");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let CommentEntity = class CommentEntity {
    async setPassword(password) {
        if (this.password) {
            this.password = await common_bcrypt_1.commonBcrypt.setBcryptPassword(password || this.password);
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CommentEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2, comment: '댓글 상태 (1: 삭제, 2: 등록)' }),
    __metadata("design:type", Number)
], CommentEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '댓글인 경우 기본값 0, 대댓글시 사용하며 부모 댓글 idx 값 입력' }),
    __metadata("design:type", Number)
], CommentEntity.prototype, "parentIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '게시판: bc (추후 주문, 회원, 기타 등등 추가 될 예정)' }),
    __metadata("design:type", String)
], CommentEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '댓글을 참조할 데이터 idx (게시판 댓글인 경우 게시글의 idx)' }),
    __metadata("design:type", Number)
], CommentEntity.prototype, "foreignIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '', comment: '댓글 내용' }),
    __metadata("design:type", String)
], CommentEntity.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '작성자 명' }),
    __metadata("design:type", String)
], CommentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentEntity.prototype, "setPassword", null);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '댓글 비밀번호 (비회원 작성시에 필요)' }),
    __metadata("design:type", String)
], CommentEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '권한 (사용X)' }),
    __metadata("design:type", String)
], CommentEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CommentEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CommentEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UsersEntity, (user) => user.review, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", user_entity_1.UsersEntity)
], CommentEntity.prototype, "user", void 0);
CommentEntity = __decorate([
    (0, typeorm_1.Entity)('comment')
], CommentEntity);
exports.CommentEntity = CommentEntity;
//# sourceMappingURL=comment.entity.js.map