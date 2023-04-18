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
exports.EmailEntity = void 0;
const typeorm_1 = require("typeorm");
let EmailEntity = class EmailEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmailEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2, comment: '메일 사용여부 (1: 미사용, 2: 사용)' }),
    __metadata("design:type", Number)
], EmailEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '메일 발송 유형' }),
    __metadata("design:type", String)
], EmailEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '발송 그룹 (admin|host|guest)' }),
    __metadata("design:type", String)
], EmailEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], EmailEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '메일 제목' }),
    __metadata("design:type", String)
], EmailEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '메일 설명' }),
    __metadata("design:type", String)
], EmailEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], EmailEntity.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmailEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EmailEntity.prototype, "updatedAt", void 0);
EmailEntity = __decorate([
    (0, typeorm_1.Entity)('email')
], EmailEntity);
exports.EmailEntity = EmailEntity;
//# sourceMappingURL=email.entity.js.map