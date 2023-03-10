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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const role_decorator_1 = require("../common/decorator/role.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const comment_service_1 = require("./comment.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async create(user, createCommentDto) {
        return await this.commentService.create(user, createCommentDto);
    }
    async findAll(category, foreignIdx, take, page) {
        const { data } = await this.commentService.findAll(category, +foreignIdx, { take, page });
        return Object.assign({}, data);
    }
    findOne(id) {
        return this.commentService.findOne(+id);
    }
    async update(idx, user, updateCommentDto) {
        return await this.commentService.update(+idx, user, updateCommentDto);
    }
    remove(id) {
        return this.commentService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '회원 댓글 등록 API' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity,
        create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':category/:foreignIdx'),
    (0, swagger_1.ApiOperation)({ summary: '댓글 리스트 조회 API' }),
    (0, swagger_1.ApiParam)({
        name: "category",
        description: 'comment category값(ex 게시글 조회시 "bc")',
    }),
    (0, swagger_1.ApiParam)({
        name: "foreignIdx",
        description: 'comment foreignIdx(ex 게시글 조회시 "게시글 idx")',
    }),
    __param(0, (0, common_1.Param)('category')),
    __param(1, (0, common_1.Param)('foreignIdx')),
    __param(2, (0, common_1.Query)('take')),
    __param(3, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':idx'),
    (0, swagger_1.ApiOperation)({
        summary: '회원 댓글 수정 API',
        description: '댓글 삭제인 경우만 status 1 입력<br>'
            + 'contents는 댓글 내용 수정시 사용',
    }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({
        name: "idx",
        description: 'comment idx값',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            example: {
                status: 'string',
                contents: 'string'
            }
        }
    }),
    __param(0, (0, common_1.Param)('idx')),
    __param(1, (0, getuser_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.UsersEntity,
        update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "remove", null);
CommentController = __decorate([
    (0, common_1.Controller)('comment'),
    (0, swagger_1.ApiTags)('댓글 API'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map