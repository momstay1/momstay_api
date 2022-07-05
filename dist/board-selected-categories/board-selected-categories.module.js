"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardSelectedCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const board_selected_categories_service_1 = require("./board-selected-categories.service");
const board_selected_categories_controller_1 = require("./board-selected-categories.controller");
const typeorm_1 = require("@nestjs/typeorm");
const board_selected_categories_entity_1 = require("./entities/board-selected-categories.entity");
const board_categories_module_1 = require("../board-categories/board-categories.module");
let BoardSelectedCategoriesModule = class BoardSelectedCategoriesModule {
};
BoardSelectedCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([board_selected_categories_entity_1.BoardSelectedCategoriesEntity]),
            board_categories_module_1.BoardCategoriesModule,
        ],
        controllers: [board_selected_categories_controller_1.BoardSelectedCategoriesController],
        providers: [board_selected_categories_service_1.BoardSelectedCategoriesService],
        exports: [board_selected_categories_service_1.BoardSelectedCategoriesService],
    })
], BoardSelectedCategoriesModule);
exports.BoardSelectedCategoriesModule = BoardSelectedCategoriesModule;
//# sourceMappingURL=board-selected-categories.module.js.map