"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardContentsModule = void 0;
const common_1 = require("@nestjs/common");
const board_contents_service_1 = require("./board-contents.service");
const board_contents_controller_1 = require("./board-contents.controller");
const typeorm_1 = require("@nestjs/typeorm");
const board_content_entity_1 = require("./entities/board-content.entity");
const users_module_1 = require("../users/users.module");
const board_categories_module_1 = require("../board-categories/board-categories.module");
const boards_module_1 = require("../boards/boards.module");
const board_selected_categories_module_1 = require("../board-selected-categories/board-selected-categories.module");
const notice_contents_controller_1 = require("./notice-contents.controller");
let BoardContentsModule = class BoardContentsModule {
};
BoardContentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([board_content_entity_1.BoardContentsEntity]),
            users_module_1.UsersModule,
            boards_module_1.BoardsModule,
            board_selected_categories_module_1.BoardSelectedCategoriesModule,
            board_categories_module_1.BoardCategoriesModule
        ],
        controllers: [board_contents_controller_1.BoardContentsController, notice_contents_controller_1.NoticeContentsController],
        providers: [board_contents_service_1.BoardContentsService]
    })
], BoardContentsModule);
exports.BoardContentsModule = BoardContentsModule;
//# sourceMappingURL=board-contents.module.js.map