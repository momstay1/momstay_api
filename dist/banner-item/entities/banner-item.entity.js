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
exports.BannerItemEntity = void 0;
const banner_entity_1 = require("../../banner/entities/banner.entity");
const typeorm_1 = require("typeorm");
let BannerItemEntity = class BannerItemEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BannerItemEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2, comment: '배너 아이템 상태(1: 미사용, 2: 사용)' }),
    __metadata("design:type", Number)
], BannerItemEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '배너 아이템 순서' }),
    __metadata("design:type", Number)
], BannerItemEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '', comment: '배너 아이템 정보' }),
    __metadata("design:type", String)
], BannerItemEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: '0', comment: '배너 아이템 시작시간' }),
    __metadata("design:type", String)
], BannerItemEntity.prototype, "start", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: '0', comment: '배너 아이템 종료시간' }),
    __metadata("design:type", String)
], BannerItemEntity.prototype, "end", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => banner_entity_1.BannerEntity, (bn) => bn.bannerItem),
    __metadata("design:type", banner_entity_1.BannerEntity)
], BannerItemEntity.prototype, "banner", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BannerItemEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BannerItemEntity.prototype, "updatedAt", void 0);
BannerItemEntity = __decorate([
    (0, typeorm_1.Entity)('banner_item')
], BannerItemEntity);
exports.BannerItemEntity = BannerItemEntity;
//# sourceMappingURL=banner-item.entity.js.map