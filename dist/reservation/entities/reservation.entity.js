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
exports.ReservationEntity = void 0;
const product_option_entity_1 = require("../../product-option/entities/product-option.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let ReservationEntity = class ReservationEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1, comment: '방문예약 상태 (1: 예약대기, 2: 예약승인, 3: 예약확정, 4: 예약취소, 5: 예약거부)' }),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: null, nullable: true, comment: '방문날짜' }),
    __metadata("design:type", Object)
], ReservationEntity.prototype, "visitDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', default: null, nullable: true, comment: '방문시간' }),
    __metadata("design:type", Object)
], ReservationEntity.prototype, "visitTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: null, nullable: true, comment: '입주날짜' }),
    __metadata("design:type", Object)
], ReservationEntity.prototype, "occupancyAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: null, nullable: true, comment: '퇴거날짜' }),
    __metadata("design:type", Object)
], ReservationEntity.prototype, "evictionAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '', comment: '메세지' }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_option_entity_1.ProductOptionEntity, (po) => po.reservation, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", product_option_entity_1.ProductOptionEntity)
], ReservationEntity.prototype, "productOption", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UsersEntity, (user) => user.reservation, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", user_entity_1.UsersEntity)
], ReservationEntity.prototype, "user", void 0);
ReservationEntity = __decorate([
    (0, typeorm_1.Entity)('reservation')
], ReservationEntity);
exports.ReservationEntity = ReservationEntity;
//# sourceMappingURL=reservation.entity.js.map