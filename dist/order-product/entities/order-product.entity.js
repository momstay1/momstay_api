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
exports.OrderProductEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const order_entity_1 = require("../../order/entities/order.entity");
const product_option_entity_1 = require("../../product-option/entities/product-option.entity");
let OrderProductEntity = class OrderProductEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderProductEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], OrderProductEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "eq", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "productOptionCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "productType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "parcelCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], OrderProductEntity.prototype, "num", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.00, precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.00, precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderProductEntity.prototype, "taxPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.00, precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderProductEntity.prototype, "feePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], OrderProductEntity.prototype, "point", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.00, precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderProductEntity.prototype, "payPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.00, precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderProductEntity.prototype, "cancelPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], OrderProductEntity.prototype, "cancelPoint", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "cancelReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: '0' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: '0' }),
    __metadata("design:type", String)
], OrderProductEntity.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderProductEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderProductEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UsersEntity, (user) => user.orderProduct, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", user_entity_1.UsersEntity)
], OrderProductEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.OrderEntity, (order) => order.orderProduct, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", order_entity_1.OrderEntity)
], OrderProductEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_option_entity_1.ProductOptionEntity, (po) => po.orderProduct),
    __metadata("design:type", product_option_entity_1.ProductOptionEntity)
], OrderProductEntity.prototype, "productOption", void 0);
OrderProductEntity = __decorate([
    (0, typeorm_1.Entity)('order_product')
], OrderProductEntity);
exports.OrderProductEntity = OrderProductEntity;
//# sourceMappingURL=order-product.entity.js.map