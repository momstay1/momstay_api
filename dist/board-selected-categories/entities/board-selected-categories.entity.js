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
exports.BoardSelectedCategoriesEntity = void 0;
const board_categories_entity_1 = require("../../board-categories/entities/board-categories.entity");
const board_content_entity_1 = require("../../board-contents/entities/board-content.entity");
const typeorm_1 = require("typeorm");
let BoardSelectedCategoriesEntity = class BoardSelectedCategoriesEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BoardSelectedCategoriesEntity.prototype, "bscat_idx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BoardSelectedCategoriesEntity.prototype, "bscat_bcat_idx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BoardSelectedCategoriesEntity.prototype, "bscat_bc_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 10 }),
    __metadata("design:type", Number)
], BoardSelectedCategoriesEntity.prototype, "bscat_order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_categories_entity_1.BoardCategoriesEntity, (bcat) => bcat.bscats, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", board_categories_entity_1.BoardCategoriesEntity)
], BoardSelectedCategoriesEntity.prototype, "bcats", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_content_entity_1.BoardContentsEntity, (bc) => bc.bscats, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    }),
    __metadata("design:type", void 0)
], BoardSelectedCategoriesEntity.prototype, "bc", void 0);
BoardSelectedCategoriesEntity = __decorate([
    (0, typeorm_1.Entity)('board_selected_categories')
], BoardSelectedCategoriesEntity);
exports.BoardSelectedCategoriesEntity = BoardSelectedCategoriesEntity;
//# sourceMappingURL=board-selected-categories.entity.js.map