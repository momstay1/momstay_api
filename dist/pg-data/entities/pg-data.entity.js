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
exports.PgDataEntity = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
let PgDataEntity = class PgDataEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PgDataEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "productCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PgDataEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "imp_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "merchant_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "pay_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "pg_provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "pg_tid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "pg_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "escrow", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "apply_num", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "bank_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "bank_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "card_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "card_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PgDataEntity.prototype, "card_quota", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "card_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "card_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "vbank_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "vbank_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "vbank_num", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "vbank_holder", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PgDataEntity.prototype, "vbank_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PgDataEntity.prototype, "vbank_issued_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PgDataEntity.prototype, "cancel_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "buyer_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "buyer_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "buyer_tel", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "buyer_addr", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "buyer_postcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "custom_data", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "user_agent", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PgDataEntity.prototype, "started_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PgDataEntity.prototype, "paid_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PgDataEntity.prototype, "failed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PgDataEntity.prototype, "cancelled_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "fail_reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "cancel_reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "receipt_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "cancel_history", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "cancel_receipt_urls", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "cash_receipt_issued", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "customer_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "customer_uid_usage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], PgDataEntity.prototype, "pg_data", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PgDataEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PgDataEntity.prototype, "updatedAt", void 0);
PgDataEntity = __decorate([
    (0, typeorm_2.Entity)('pg_data')
], PgDataEntity);
exports.PgDataEntity = PgDataEntity;
//# sourceMappingURL=pg-data.entity.js.map