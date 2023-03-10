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
exports.OrderTotalEntity = void 0;
const typeorm_1 = require("typeorm");
let OrderTotalEntity = class OrderTotalEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderTotalEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], OrderTotalEntity.prototype, "orderIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '주문 총 금액' }),
    __metadata("design:type", Number)
], OrderTotalEntity.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '취소 주문 총 금액' }),
    __metadata("design:type", Number)
], OrderTotalEntity.prototype, "totalCancelPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '배송비' }),
    __metadata("design:type", Number)
], OrderTotalEntity.prototype, "shipPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '추가배송비' }),
    __metadata("design:type", Number)
], OrderTotalEntity.prototype, "shipAddPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '포인트 할인 금액' }),
    __metadata("design:type", Number)
], OrderTotalEntity.prototype, "pointDc", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '쿠폰 할인 금액' }),
    __metadata("design:type", Number)
], OrderTotalEntity.prototype, "couponDc", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '배송비 할인 금액' }),
    __metadata("design:type", Number)
], OrderTotalEntity.prototype, "shipDc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '할인 계산 후 총 금액' }),
    __metadata("design:type", Number)
], OrderTotalEntity.prototype, "payPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0.00, precision: 10, scale: 2, comment: '최초 주문시 결제된 금액' }),
    __metadata("design:type", Number)
], OrderTotalEntity.prototype, "origPayPrice", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderTotalEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderTotalEntity.prototype, "updatedAt", void 0);
OrderTotalEntity = __decorate([
    (0, typeorm_1.Entity)('order_total')
], OrderTotalEntity);
exports.OrderTotalEntity = OrderTotalEntity;
//# sourceMappingURL=order-total.entity.js.map