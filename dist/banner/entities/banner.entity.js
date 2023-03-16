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
exports.BannerEntity = void 0;
const banner_item_entity_1 = require("../../banner-item/entities/banner-item.entity");
const typeorm_1 = require("typeorm");
let BannerEntity = class BannerEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BannerEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2, comment: '배너 상태(1: 미사용, 2: 사용)' }),
    __metadata("design:type", Number)
], BannerEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '배너 정렬 번호' }),
    __metadata("design:type", Number)
], BannerEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '배너 아이디' }),
    __metadata("design:type", String)
], BannerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '', comment: '배너 제목' }),
    __metadata("design:type", String)
], BannerEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '', comment: '배너 아이템 정보' }),
    __metadata("design:type", String)
], BannerEntity.prototype, "itemInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => banner_item_entity_1.BannerItemEntity, (bni) => bni.banner),
    __metadata("design:type", Array)
], BannerEntity.prototype, "bannerItem", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BannerEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BannerEntity.prototype, "updatedAt", void 0);
BannerEntity = __decorate([
    (0, typeorm_1.Entity)('banner')
], BannerEntity);
exports.BannerEntity = BannerEntity;
//# sourceMappingURL=banner.entity.js.map