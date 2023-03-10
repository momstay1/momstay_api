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
exports.ProductOptionEntity = void 0;
const order_product_entity_1 = require("../../order-product/entities/order-product.entity");
const product_info_entity_1 = require("../../product-info/entities/product-info.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const reservation_entity_1 = require("../../reservation/entities/reservation.entity");
const typeorm_1 = require("typeorm");
let ProductOptionEntity = class ProductOptionEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductOptionEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2 }),
    __metadata("design:type", Number)
], ProductOptionEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "stayStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "visitStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "titleEng", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "titleJpn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "titleChn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ProductOptionEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ProductOptionEntity.prototype, "priceMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ProductOptionEntity.prototype, "priceWeek", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ProductOptionEntity.prototype, "priceDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "detailsKor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "detailsEng", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "detailsJpn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "detailsChn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "oldIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "oldData", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductOptionEntity.prototype, "privateFacility", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProductOptionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProductOptionEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.productOption, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", product_entity_1.ProductEntity)
], ProductOptionEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.ReservationEntity, (rev) => rev.productOption),
    __metadata("design:type", void 0)
], ProductOptionEntity.prototype, "reservation", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_info_entity_1.ProductInfoEntity, (pi) => pi.productOption),
    __metadata("design:type", Array)
], ProductOptionEntity.prototype, "productInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_product_entity_1.OrderProductEntity, (op) => op.productOption),
    __metadata("design:type", void 0)
], ProductOptionEntity.prototype, "orderProduct", void 0);
ProductOptionEntity = __decorate([
    (0, typeorm_1.Entity)("product_option")
], ProductOptionEntity);
exports.ProductOptionEntity = ProductOptionEntity;
//# sourceMappingURL=product-option.entity.js.map