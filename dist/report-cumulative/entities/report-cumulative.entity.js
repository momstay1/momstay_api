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
exports.ReportCumulativeEntity = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const report_content_entity_1 = require("./report-content.entity");
let ReportCumulativeEntity = class ReportCumulativeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReportCumulativeEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '신고 연관된 테이블 정보' }),
    __metadata("design:type", String)
], ReportCumulativeEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '신고 연관된 테이블의 idx' }),
    __metadata("design:type", Number)
], ReportCumulativeEntity.prototype, "foreignIdx", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => report_content_entity_1.ReportContentEntity, (recon) => recon.reportCumulative),
    __metadata("design:type", report_content_entity_1.ReportContentEntity)
], ReportCumulativeEntity.prototype, "reportContent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UsersEntity, (user) => user.reportCumulative),
    __metadata("design:type", user_entity_1.UsersEntity)
], ReportCumulativeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReportCumulativeEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ReportCumulativeEntity.prototype, "updatedAt", void 0);
ReportCumulativeEntity = __decorate([
    (0, typeorm_1.Entity)('report_cumulative')
], ReportCumulativeEntity);
exports.ReportCumulativeEntity = ReportCumulativeEntity;
//# sourceMappingURL=report-cumulative.entity.js.map