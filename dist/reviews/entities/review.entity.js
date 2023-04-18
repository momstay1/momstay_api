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
exports.ReviewEntity = void 0;
const product_entity_1 = require("../../product/entities/product.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let ReviewEntity = class ReviewEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2, comment: '상태 (-1: 삭제, 1: 미등록, 2: 등록)' }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '부모 댓글 idx' }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '대댓글 정보' }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "depth", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '평점 (1~10)' }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "star", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '주문 상품 idx' }),
    __metadata("design:type", String)
], ReviewEntity.prototype, "orderProductIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '', comment: '후기 내용' }),
    __metadata("design:type", String)
], ReviewEntity.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '권한 관련 정보 (사용 X)' }),
    __metadata("design:type", String)
], ReviewEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: '0', comment: '입주일' }),
    __metadata("design:type", String)
], ReviewEntity.prototype, "start", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: '0', comment: '퇴거일' }),
    __metadata("design:type", String)
], ReviewEntity.prototype, "end", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReviewEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ReviewEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.review, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", product_entity_1.ProductEntity)
], ReviewEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UsersEntity, (user) => user.review, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", user_entity_1.UsersEntity)
], ReviewEntity.prototype, "user", void 0);
ReviewEntity = __decorate([
    (0, typeorm_1.Entity)('reviews')
], ReviewEntity);
exports.ReviewEntity = ReviewEntity;
//# sourceMappingURL=review.entity.js.map