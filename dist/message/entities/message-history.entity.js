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
exports.MessageHistoryEntity = void 0;
const typeorm_1 = require("typeorm");
let MessageHistoryEntity = class MessageHistoryEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MessageHistoryEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '메세지타입' }),
    __metadata("design:type", String)
], MessageHistoryEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', length: 255, comment: '템플릿 코드' }),
    __metadata("design:type", String)
], MessageHistoryEntity.prototype, "templateCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '요청 내용' }),
    __metadata("design:type", String)
], MessageHistoryEntity.prototype, "req", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '응답 내용' }),
    __metadata("design:type", String)
], MessageHistoryEntity.prototype, "res", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', length: 255, comment: '응답 타입' }),
    __metadata("design:type", String)
], MessageHistoryEntity.prototype, "resType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '응답 코드' }),
    __metadata("design:type", String)
], MessageHistoryEntity.prototype, "resCode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MessageHistoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MessageHistoryEntity.prototype, "updatedAt", void 0);
MessageHistoryEntity = __decorate([
    (0, typeorm_1.Entity)('message_history')
], MessageHistoryEntity);
exports.MessageHistoryEntity = MessageHistoryEntity;
//# sourceMappingURL=message-history.entity.js.map