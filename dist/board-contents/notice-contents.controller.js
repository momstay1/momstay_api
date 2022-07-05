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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeContentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const board_contents_service_1 = require("./board-contents.service");
const board_content_entity_1 = require("./entities/board-content.entity");
let NoticeContentsController = class NoticeContentsController {
    constructor(boardContentsService) {
        this.boardContentsService = boardContentsService;
        this.sanitizeBoardContent = (bc) => {
            return common_utils_1.commonUtils.sanitizeEntity(bc, this.boardContentsService.getPrivateColumn());
        };
    }
    async findAll() {
        const bc = await this.boardContentsService.findNoticeAll();
        return (0, lodash_1.map)(bc, (obj) => {
            return this.sanitizeBoardContent(obj);
        });
    }
    async findCategoryAll(category) {
        const bc = await this.boardContentsService.findNoticeCategoryAll(category);
        return (0, lodash_1.map)(bc, (obj) => {
            return this.sanitizeBoardContent(obj);
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '공지사항 게시글 전체 리스트 API' }),
    (0, swagger_1.ApiCreatedResponse)({ type: board_content_entity_1.BoardContentsEntity }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NoticeContentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':category'),
    (0, swagger_1.ApiOperation)({ summary: '공지사항 게시글 카테고리 리스트 API' }),
    (0, swagger_1.ApiCreatedResponse)({ type: board_content_entity_1.BoardContentsEntity }),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoticeContentsController.prototype, "findCategoryAll", null);
NoticeContentsController = __decorate([
    (0, common_1.Controller)('notice-contents'),
    (0, swagger_1.ApiTags)('공지사항 게시글 API'),
    __metadata("design:paramtypes", [board_contents_service_1.BoardContentsService])
], NoticeContentsController);
exports.NoticeContentsController = NoticeContentsController;
//# sourceMappingURL=notice-contents.controller.js.map