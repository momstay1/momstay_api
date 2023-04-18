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
exports.MembershipHistoryEntity = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let MembershipHistoryEntity = class MembershipHistoryEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MembershipHistoryEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '0', comment: '상태값 (1: 신청, 2: 승인, 3: 종료)' }),
    __metadata("design:type", Number)
], MembershipHistoryEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '입금자 명' }),
    __metadata("design:type", String)
], MembershipHistoryEntity.prototype, "depositor", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '0', comment: '멤버십 기간 (1: 1개월, 3: 3개월 ...)' }),
    __metadata("design:type", Number)
], MembershipHistoryEntity.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: null, nullable: true, comment: '멤버십 시작일' }),
    __metadata("design:type", String)
], MembershipHistoryEntity.prototype, "start", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: null, nullable: true, comment: '멤버십 종료일' }),
    __metadata("design:type", String)
], MembershipHistoryEntity.prototype, "end", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UsersEntity, (user) => user.membershipHistory, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", user_entity_1.UsersEntity)
], MembershipHistoryEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MembershipHistoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MembershipHistoryEntity.prototype, "updatedAt", void 0);
MembershipHistoryEntity = __decorate([
    (0, typeorm_1.Entity)('membership_history')
], MembershipHistoryEntity);
exports.MembershipHistoryEntity = MembershipHistoryEntity;
//# sourceMappingURL=membership-history.entity.js.map