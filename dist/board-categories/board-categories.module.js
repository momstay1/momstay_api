"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const board_categories_service_1 = require("./board-categories.service");
const board_categories_controller_1 = require("./board-categories.controller");
const typeorm_1 = require("@nestjs/typeorm");
const board_categories_entity_1 = require("./entities/board-categories.entity");
let BoardCategoriesModule = class BoardCategoriesModule {
};
BoardCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([board_categories_entity_1.BoardCategoriesEntity]),],
        controllers: [board_categories_controller_1.BoardCategoriesController],
        providers: [board_categories_service_1.BoardCategoriesService],
        exports: [board_categories_service_1.BoardCategoriesService]
    })
], BoardCategoriesModule);
exports.BoardCategoriesModule = BoardCategoriesModule;
//# sourceMappingURL=board-categories.module.js.map