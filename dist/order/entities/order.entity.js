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
exports.OrderEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const order_product_entity_1 = require("../../order-product/entities/order-product.entity");
let OrderEntity = class OrderEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "imp_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "billingKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "clientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "clientEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "clientPhone1", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "clientPhone2", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "inPostCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "inAddr1", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "inAddr2", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipPhone1", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipPhone2", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipArea", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipPostCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipNation", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipState", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipCity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipAddr1", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipAddr2", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "bank", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "depositer", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "remitter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "clientMemo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "adminMemo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "pc_mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: '0' }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "paiedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_product_entity_1.OrderProductEntity, (op) => op.order),
    __metadata("design:type", Array)
], OrderEntity.prototype, "orderProduct", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UsersEntity, (user) => user.order, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", user_entity_1.UsersEntity)
], OrderEntity.prototype, "user", void 0);
OrderEntity = __decorate([
    (0, typeorm_1.Entity)('order')
], OrderEntity);
exports.OrderEntity = OrderEntity;
//# sourceMappingURL=order.entity.js.map