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
exports.RefreshTokenEntity = void 0;
const typeorm_1 = require("typeorm");
let RefreshTokenEntity = class RefreshTokenEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RefreshTokenEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "user_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: '0' }),
    __metadata("design:type", Date)
], RefreshTokenEntity.prototype, "expriedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RefreshTokenEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RefreshTokenEntity.prototype, "updatedAt", void 0);
RefreshTokenEntity = __decorate([
    (0, typeorm_1.Entity)('refresh_token')
], RefreshTokenEntity);
exports.RefreshTokenEntity = RefreshTokenEntity;
//# sourceMappingURL=refresh-token.entity.js.map