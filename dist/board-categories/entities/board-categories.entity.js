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
exports.BoardCategoriesEntity = void 0;
const board_selected_categories_entity_1 = require("../../board-selected-categories/entities/board-selected-categories.entity");
const board_entity_1 = require("../../boards/entities/board.entity");
const typeorm_1 = require("typeorm");
let BoardCategoriesEntity = class BoardCategoriesEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BoardCategoriesEntity.prototype, "bcat_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BoardCategoriesEntity.prototype, "bcat_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BoardCategoriesEntity.prototype, "bcat_bd_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], BoardCategoriesEntity.prototype, "bcat_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BoardCategoriesEntity.prototype, "bcat_title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], BoardCategoriesEntity.prototype, "bcat_content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BoardCategoriesEntity.prototype, "bcat_createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BoardCategoriesEntity.prototype, "bcat_updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_entity_1.BoardsEntity, (board) => board.board_categories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", board_entity_1.BoardsEntity)
], BoardCategoriesEntity.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => board_selected_categories_entity_1.BoardSelectedCategoriesEntity, (bscat) => bscat.bcats),
    __metadata("design:type", void 0)
], BoardCategoriesEntity.prototype, "bscats", void 0);
BoardCategoriesEntity = __decorate([
    (0, typeorm_1.Entity)('board_categories')
], BoardCategoriesEntity);
exports.BoardCategoriesEntity = BoardCategoriesEntity;
//# sourceMappingURL=board-categories.entity.js.map