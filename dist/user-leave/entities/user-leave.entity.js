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
exports.UserLeaveEntity = void 0;
const typeorm_1 = require("typeorm");
let UserLeaveEntity = class UserLeaveEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserLeaveEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '탈퇴한 회원 id' }),
    __metadata("design:type", String)
], UserLeaveEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '탈퇴한 회원의 user idx' }),
    __metadata("design:type", Number)
], UserLeaveEntity.prototype, "user_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '탈퇴한 회원 사유' }),
    __metadata("design:type", String)
], UserLeaveEntity.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '회원 정보' }),
    __metadata("design:type", String)
], UserLeaveEntity.prototype, "userInfo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserLeaveEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserLeaveEntity.prototype, "updatedAt", void 0);
UserLeaveEntity = __decorate([
    (0, typeorm_1.Entity)('users_leave')
], UserLeaveEntity);
exports.UserLeaveEntity = UserLeaveEntity;
//# sourceMappingURL=user-leave.entity.js.map