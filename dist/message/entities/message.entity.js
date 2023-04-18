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
exports.MessageEntity = void 0;
const typeorm_1 = require("typeorm");
let MessageEntity = class MessageEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MessageEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2, comment: '메시지 사용 여부' }),
    __metadata("design:type", Number)
], MessageEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', length: 255, comment: '메시지 그룹' }),
    __metadata("design:type", String)
], MessageEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', length: 255, comment: '메시지 유형' }),
    __metadata("design:type", String)
], MessageEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', length: 255, comment: '메시지 보내기 유형(alimtalk | sms)' }),
    __metadata("design:type", String)
], MessageEntity.prototype, "sendtype", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', length: 255, comment: '메시지 코드 (알림톡 사용시 필요)' }),
    __metadata("design:type", String)
], MessageEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '메시지 내용' }),
    __metadata("design:type", String)
], MessageEntity.prototype, "tmpl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '메시지 버튼(알림톡 버튼 설정시 필요)' }),
    __metadata("design:type", String)
], MessageEntity.prototype, "buttons", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MessageEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MessageEntity.prototype, "updatedAt", void 0);
MessageEntity = __decorate([
    (0, typeorm_1.Entity)('message')
], MessageEntity);
exports.MessageEntity = MessageEntity;
//# sourceMappingURL=message.entity.js.map