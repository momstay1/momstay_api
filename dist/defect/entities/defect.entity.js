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
exports.DefectEntity = void 0;
const place_entity_1 = require("../../place/entities/place.entity");
const typeorm_1 = require("typeorm");
let DefectEntity = class DefectEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DefectEntity.prototype, "dft_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_place_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_sort1", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_sort2", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_sort3", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '1' }),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_work_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_replacement_square_meter", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_replacement_sheet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_shooting_day", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DefectEntity.prototype, "dft_device_key", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DefectEntity.prototype, "dft_createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DefectEntity.prototype, "dft_updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => place_entity_1.PlaceEntity, (place) => place.defect, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", place_entity_1.PlaceEntity)
], DefectEntity.prototype, "place", void 0);
DefectEntity = __decorate([
    (0, typeorm_1.Entity)('defect')
], DefectEntity);
exports.DefectEntity = DefectEntity;
//# sourceMappingURL=defect.entity.js.map