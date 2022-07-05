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
exports.BoardsEntity = void 0;
const board_categories_entity_1 = require("../../board-categories/entities/board-categories.entity");
const board_content_entity_1 = require("../../board-contents/entities/board-content.entity");
const typeorm_1 = require("typeorm");
let BoardsEntity = class BoardsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BoardsEntity.prototype, "bd_idx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BoardsEntity.prototype, "bd_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BoardsEntity.prototype, "bd_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BoardsEntity.prototype, "bd_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BoardsEntity.prototype, "bd_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 10 }),
    __metadata("design:type", Number)
], BoardsEntity.prototype, "bd_order", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'root' }),
    __metadata("design:type", String)
], BoardsEntity.prototype, "bd_lists_auth", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'root' }),
    __metadata("design:type", String)
], BoardsEntity.prototype, "bd_write_auth", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'root' }),
    __metadata("design:type", String)
], BoardsEntity.prototype, "bd_view_auth", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BoardsEntity.prototype, "bd_createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BoardsEntity.prototype, "bd_updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => board_content_entity_1.BoardContentsEntity, (bc) => bc.board),
    __metadata("design:type", void 0)
], BoardsEntity.prototype, "board_contents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => board_categories_entity_1.BoardCategoriesEntity, (bc) => bc.board),
    __metadata("design:type", void 0)
], BoardsEntity.prototype, "board_categories", void 0);
BoardsEntity = __decorate([
    (0, typeorm_1.Entity)('boards')
], BoardsEntity);
exports.BoardsEntity = BoardsEntity;
//# sourceMappingURL=board.entity.js.map