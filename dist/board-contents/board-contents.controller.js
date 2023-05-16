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
exports.BoardContentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const common_utils_1 = require("../common/common.utils");
const role_decorator_1 = require("../common/decorator/role.decorator");
const response_error_dto_1 = require("../error/dto/response-error.dto");
const user_entity_1 = require("../users/entities/user.entity");
const board_contents_service_1 = require("./board-contents.service");
const create_board_content_dto_1 = require("./dto/create-board-content.dto");
const update_board_content_dto_1 = require("./dto/update-board-content.dto");
const board_content_entity_1 = require("./entities/board-content.entity");
let BoardContentsController = class BoardContentsController {
    constructor(boardContentsService) {
        this.boardContentsService = boardContentsService;
        this.sanitizeBoardContent = (bc) => {
            return common_utils_1.commonUtils.sanitizeEntity(bc, this.boardContentsService.getPrivateColumn());
        };
    }
    async create(user, createBoardContentDto) {
        return await this.boardContentsService.create(user, createBoardContentDto);
    }
    async findCategoryAll(bd_idx, category, take, page, order, search) {
        const { bc, bcats } = await this.boardContentsService.findCategoryAll(bd_idx, category, { take, page }, order, search);
        return Object.assign({ bcats }, bc);
    }
    async findOne(bd_idx, bc_idx) {
        const bc = await this.boardContentsService.findOne(bc_idx);
        return bc;
    }
    async update(user, bc_idx, updateBoardContentDto) {
        const bc = await this.boardContentsService.update(user, +bc_idx, updateBoardContentDto);
        return this.sanitizeBoardContent(bc);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '게시글 생성 API' }),
    (0, swagger_1.ApiCreatedResponse)({ type: create_board_content_dto_1.CreateBoardContentDto }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({ type: response_error_dto_1.ResponseErrorDto }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, create_board_content_dto_1.CreateBoardContentDto]),
    __metadata("design:returntype", Promise)
], BoardContentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':bd_idx'),
    (0, swagger_1.ApiOperation)({ summary: '게시글 리스트 API' }),
    (0, swagger_1.ApiCreatedResponse)({ type: board_content_entity_1.BoardContentsEntity }),
    (0, swagger_1.ApiQuery)({ name: "category", required: false }),
    (0, swagger_1.ApiQuery)({ name: "order", required: false }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        description: 'search=status:1,2,3<br>'
            + 'search=type:1,2,3<br>',
        required: false
    }),
    __param(0, (0, common_1.Param)('bd_idx')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('take')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('order')),
    __param(5, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, String, Array]),
    __metadata("design:returntype", Promise)
], BoardContentsController.prototype, "findCategoryAll", null);
__decorate([
    (0, common_1.Get)(':bd_idx/:bc_idx'),
    (0, swagger_1.ApiOperation)({ summary: '게시글 상세 API' }),
    (0, swagger_1.ApiCreatedResponse)({ type: board_content_entity_1.BoardContentsEntity }),
    __param(0, (0, common_1.Param)('bd_idx')),
    __param(1, (0, common_1.Param)('bc_idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BoardContentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':bc_idx'),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('bc_idx')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String, update_board_content_dto_1.UpdateBoardContentDto]),
    __metadata("design:returntype", Promise)
], BoardContentsController.prototype, "update", null);
BoardContentsController = __decorate([
    (0, common_1.Controller)('board-contents'),
    (0, swagger_1.ApiTags)('게시글 API'),
    __metadata("design:paramtypes", [board_contents_service_1.BoardContentsService])
], BoardContentsController);
exports.BoardContentsController = BoardContentsController;
//# sourceMappingURL=board-contents.controller.js.map