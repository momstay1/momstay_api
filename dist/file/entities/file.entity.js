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
exports.FileEntity = void 0;
const typeorm_1 = require("typeorm");
let FileEntity = class FileEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FileEntity.prototype, "file_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '-1' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_foreign_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_full_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '이미지 스토리지 서버 경로' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_storage_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '워터마크 추가된 이미지 스토리지 서버 경로' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_watermark_storage_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '워터마크 추가된 이미지 경로' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_watermark_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_html_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_html_full_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_html_thumb_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '랜덤 처리된 이미지 이름' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_raw_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', comment: '워터마크 추가된 이미지 이름' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_watermark_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_orig_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_client_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_ext", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_is_img", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_image_width", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_image_height", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_image_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_image_size_str", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FileEntity.prototype, "file_order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FileEntity.prototype, "file_createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FileEntity.prototype, "file_updatedAt", void 0);
FileEntity = __decorate([
    (0, typeorm_1.Entity)('file')
], FileEntity);
exports.FileEntity = FileEntity;
//# sourceMappingURL=file.entity.js.map