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
exports.DeviceEntity = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let DeviceEntity = class DeviceEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DeviceEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '단말기 토큰' }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '접속중인 앱 버전' }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "appVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '단말기 운영체제' }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "os", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '단말기 운영체제 버전' }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "osVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '접속 환경 (app, web)' }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "environment", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '마케팅 알림 수신 정보 동의 여부 (1: 비동의, 2: 동의)' }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "marketing", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '서비스 알림 수신 정보 동의 여부 (1: 비동의, 2: 동의)' }),
    __metadata("design:type", String)
], DeviceEntity.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: '0', comment: '마케팅 동의 여부 수정된 날짜' }),
    __metadata("design:type", Object)
], DeviceEntity.prototype, "marketingAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: '0', comment: '서비스 동의 여부 수정된 날짜' }),
    __metadata("design:type", Object)
], DeviceEntity.prototype, "serviceAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DeviceEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DeviceEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UsersEntity, (user) => user.device),
    __metadata("design:type", user_entity_1.UsersEntity)
], DeviceEntity.prototype, "user", void 0);
DeviceEntity = __decorate([
    (0, typeorm_1.Entity)('device')
], DeviceEntity);
exports.DeviceEntity = DeviceEntity;
//# sourceMappingURL=device.entity.js.map