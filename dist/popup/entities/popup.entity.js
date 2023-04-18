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
exports.PopupEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let PopupEntity = class PopupEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ description: '팝업 idx' }),
    __metadata("design:type", Number)
], PopupEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2, comment: '상태 (1: 삭제, 2: 등록)' }),
    (0, swagger_1.ApiProperty)({ description: '팝업 사용여부' }),
    __metadata("design:type", Number)
], PopupEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
        comment: '팝업 아이디 (사용자단에서 팝업 호출 시 사용)',
    }),
    (0, swagger_1.ApiProperty)({ description: '팝업 id' }),
    __metadata("design:type", String)
], PopupEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '팝업명' }),
    (0, swagger_1.ApiProperty)({ description: '팝업명' }),
    __metadata("design:type", String)
], PopupEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '노출 페이지' }),
    (0, swagger_1.ApiProperty)({ description: '노출 페이지' }),
    __metadata("design:type", String)
], PopupEntity.prototype, "page", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: null, nullable: true, comment: '팝업 노출 시작일' }),
    (0, swagger_1.ApiProperty)({ description: '팝업 노출 시작일' }),
    __metadata("design:type", Object)
], PopupEntity.prototype, "startPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: null, nullable: true, comment: '팝업 노출 종료일' }),
    (0, swagger_1.ApiProperty)({ description: '팝업 노출 종료일' }),
    __metadata("design:type", Object)
], PopupEntity.prototype, "endPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 10, comment: '팝업 노출 순위' }),
    (0, swagger_1.ApiProperty)({ description: '팝업 노출 순위' }),
    __metadata("design:type", Number)
], PopupEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '팝업 링크' }),
    (0, swagger_1.ApiProperty)({ description: '팝업 링크' }),
    __metadata("design:type", String)
], PopupEntity.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PopupEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PopupEntity.prototype, "updatedAt", void 0);
PopupEntity = __decorate([
    (0, typeorm_1.Entity)('popup')
], PopupEntity);
exports.PopupEntity = PopupEntity;
//# sourceMappingURL=popup.entity.js.map