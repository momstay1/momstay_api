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
exports.BoardCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const board_categories_service_1 = require("./board-categories.service");
let BoardCategoriesController = class BoardCategoriesController {
    constructor(boardCategoriesService) {
        this.boardCategoriesService = boardCategoriesService;
    }
    async findAll() {
        return await this.boardCategoriesService.findAll();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardCategoriesController.prototype, "findAll", null);
BoardCategoriesController = __decorate([
    (0, common_1.Controller)('board-categories'),
    (0, swagger_1.ApiTags)('게시판 카테고리 API'),
    __metadata("design:paramtypes", [board_categories_service_1.BoardCategoriesService])
], BoardCategoriesController);
exports.BoardCategoriesController = BoardCategoriesController;
//# sourceMappingURL=board-categories.controller.js.map