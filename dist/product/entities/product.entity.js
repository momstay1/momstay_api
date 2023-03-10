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
exports.ProductEntity = void 0;
const college_entity_1 = require("../../college/entities/college.entity");
const metro_entity_1 = require("../../metro/entities/metro.entity");
const product_info_entity_1 = require("../../product-info/entities/product-info.entity");
const product_option_entity_1 = require("../../product-option/entities/product-option.entity");
const review_entity_1 = require("../../reviews/entities/review.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let ProductEntity = class ProductEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2 }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "membership", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "hostBusiness", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "titleEng", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "titleJpn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "titleChn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "postCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "addr1", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "addr2", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "addr1Eng", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "addr2Eng", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "addr1Jpn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "addr2Jpn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "addr1Chn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "addr2Chn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "detailsKor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "detailsEng", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "detailsJpn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "detailsChn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "oldIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "oldData", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '편의 시설 검색 쉽게 하기 위한 column' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "productInfoIdxs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.0, precision: 10, scale: 1, comment: '평균 평점' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "star", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '리뷰 개수' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "reviewCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UsersEntity, (user) => user.product, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", user_entity_1.UsersEntity)
], ProductEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_option_entity_1.ProductOptionEntity, (po) => po.product),
    __metadata("design:type", void 0)
], ProductEntity.prototype, "productOption", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (review) => review.product),
    __metadata("design:type", void 0)
], ProductEntity.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_info_entity_1.ProductInfoEntity, (pi) => pi.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "productInfo", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => metro_entity_1.MetroEntity, (metro) => metro.product),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ProductEntity.prototype, "metro", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => college_entity_1.CollegeEntity, (college) => college.product),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ProductEntity.prototype, "college", void 0);
ProductEntity = __decorate([
    (0, typeorm_1.Entity)('product')
], ProductEntity);
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map