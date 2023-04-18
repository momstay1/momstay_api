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
exports.MessageTypeEntity = void 0;
const typeorm_1 = require("typeorm");
let MessageTypeEntity = class MessageTypeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MessageTypeEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', length: 255, comment: '메시지 유형' }),
    __metadata("design:type", String)
], MessageTypeEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', length: 255, comment: '메시지 제목' }),
    __metadata("design:type", String)
], MessageTypeEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '메시지 메모 (치환코드)' }),
    __metadata("design:type", String)
], MessageTypeEntity.prototype, "memo", void 0);
MessageTypeEntity = __decorate([
    (0, typeorm_1.Entity)('message_type')
], MessageTypeEntity);
exports.MessageTypeEntity = MessageTypeEntity;
//# sourceMappingURL=message-type.entity.js.map