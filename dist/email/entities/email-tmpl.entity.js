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
exports.EmailTmplEntity = void 0;
const typeorm_1 = require("typeorm");
const email_history_entity_1 = require("./email-history.entity");
let EmailTmplEntity = class EmailTmplEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmailTmplEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2 }),
    __metadata("design:type", Number)
], EmailTmplEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'main' }),
    __metadata("design:type", String)
], EmailTmplEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], EmailTmplEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], EmailTmplEntity.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => email_history_entity_1.EmailHistoryEntity, (emailHistory) => emailHistory.emailTmpl),
    __metadata("design:type", void 0)
], EmailTmplEntity.prototype, "emailHistory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmailTmplEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EmailTmplEntity.prototype, "updatedAt", void 0);
EmailTmplEntity = __decorate([
    (0, typeorm_1.Entity)('email_tmpl')
], EmailTmplEntity);
exports.EmailTmplEntity = EmailTmplEntity;
//# sourceMappingURL=email-tmpl.entity.js.map