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
exports.BoardContentsEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const board_selected_categories_entity_1 = require("../../board-selected-categories/entities/board-selected-categories.entity");
const board_entity_1 = require("../../boards/entities/board.entity");
const common_bcrypt_1 = require("../../common/common.bcrypt");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let BoardContentsEntity = class BoardContentsEntity {
    async setPassword(password) {
        if (this.password) {
            this.password = await common_bcrypt_1.commonBcrypt.setBcryptPassword(password || this.password);
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 idx' }),
    __metadata("design:type", Number)
], BoardContentsEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2 }),
    (0, swagger_1.ApiProperty)({ description: '게시글 상태 0: 삭제, 1:미등록 2: 등록, 3:답변대기, 4: 답변완료' }),
    __metadata("design:type", Number)
], BoardContentsEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2 }),
    (0, swagger_1.ApiProperty)({ description: '게시글 타입 1: 공지사항, 2: 일반글, 3: 비밀글(미사용), 4: 외부링크, 5: 이벤트, 6: 새소식' }),
    __metadata("design:type", Number)
], BoardContentsEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 작성자' }),
    __metadata("design:type", String)
], BoardContentsEntity.prototype, "writer", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({ description: '게시글 제목' }),
    __metadata("design:type", String)
], BoardContentsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    (0, swagger_1.ApiProperty)({ description: '게시글 링크 사용여부' }),
    __metadata("design:type", String)
], BoardContentsEntity.prototype, "linkStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    (0, swagger_1.ApiProperty)({ description: '게시글 링크' }),
    __metadata("design:type", String)
], BoardContentsEntity.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    (0, swagger_1.ApiProperty)({ description: '게시글 내용' }),
    __metadata("design:type", String)
], BoardContentsEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardContentsEntity.prototype, "setPassword", null);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], BoardContentsEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], BoardContentsEntity.prototype, "commentCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, swagger_1.ApiProperty)({ description: '게시글 조회수' }),
    __metadata("design:type", Number)
], BoardContentsEntity.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 10 }),
    (0, swagger_1.ApiProperty)({ description: '게시글 순서' }),
    __metadata("design:type", Number)
], BoardContentsEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 생성일' }),
    __metadata("design:type", Date)
], BoardContentsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({ description: '게시글 수정일' }),
    __metadata("design:type", Date)
], BoardContentsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UsersEntity, (user) => user.boardContents, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", user_entity_1.UsersEntity)
], BoardContentsEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_entity_1.BoardsEntity, (board) => board.board_contents, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", board_entity_1.BoardsEntity)
], BoardContentsEntity.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => board_selected_categories_entity_1.BoardSelectedCategoriesEntity, (bscat) => bscat.bc),
    __metadata("design:type", board_selected_categories_entity_1.BoardSelectedCategoriesEntity)
], BoardContentsEntity.prototype, "bscats", void 0);
BoardContentsEntity = __decorate([
    (0, typeorm_1.Entity)('board_contents')
], BoardContentsEntity);
exports.BoardContentsEntity = BoardContentsEntity;
//# sourceMappingURL=board-content.entity.js.map