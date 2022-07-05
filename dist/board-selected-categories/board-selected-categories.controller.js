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
exports.BoardSelectedCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const board_selected_categories_service_1 = require("./board-selected-categories.service");
let BoardSelectedCategoriesController = class BoardSelectedCategoriesController {
    constructor(boardSelectedCategoriesService) {
        this.boardSelectedCategoriesService = boardSelectedCategoriesService;
    }
};
BoardSelectedCategoriesController = __decorate([
    (0, common_1.Controller)('board-selected-categories'),
    __metadata("design:paramtypes", [board_selected_categories_service_1.BoardSelectedCategoriesService])
], BoardSelectedCategoriesController);
exports.BoardSelectedCategoriesController = BoardSelectedCategoriesController;
//# sourceMappingURL=board-selected-categories.controller.js.map