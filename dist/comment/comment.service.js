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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const board_contents_service_1 = require("../board-contents/board-contents.service");
const paginate_1 = require("../paginate");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const statusRegistration = '2';
const statusDelete = '1';
let CommentService = class CommentService {
    constructor(commentRepository, userService, boardContentsService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.boardContentsService = boardContentsService;
    }
    async create(userInfo, createCommentDto) {
        const user = await this.userService.findId((0, lodash_1.get)(userInfo, 'id'));
        const comment_data = {
            user: user,
            parentIdx: (0, lodash_1.get)(createCommentDto, 'parentIdx', 0),
            category: (0, lodash_1.get)(createCommentDto, 'category'),
            foreignIdx: (0, lodash_1.get)(createCommentDto, 'foreignIdx'),
            contents: (0, lodash_1.get)(createCommentDto, 'contents'),
            name: (0, lodash_1.get)(createCommentDto, 'name'),
        };
        if ((0, lodash_1.get)(createCommentDto, 'status', ''))
            comment_data['status'] = createCommentDto['status'];
        if ((0, lodash_1.get)(createCommentDto, 'password', ''))
            comment_data['password'] = createCommentDto['password'];
        if ((0, lodash_1.get)(createCommentDto, 'author', ''))
            comment_data['author'] = createCommentDto['author'];
        const commentEntity = await this.commentRepository.create(comment_data);
        const comment = await this.commentRepository.save(commentEntity);
        if (comment['category'] == 'bc') {
            await this.boardContentsService.statusAnswer(comment['foreignIdx']);
            await this.boardContentsService.commentCountUp(comment['foreignIdx']);
        }
        return { comment };
    }
    async findAll(category, foreignIdx, options) {
        const { take, page } = options;
        const where = {
            status: statusRegistration,
            category,
            foreignIdx
        };
        const orderBy = {};
        orderBy['createdAt'] = 'DESC';
        const [results, total] = await this.commentRepository.findAndCount({
            where: where,
            order: orderBy,
            relations: ['user'],
            skip: (take * (page - 1) || 0),
            take: (take || 10)
        });
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data };
    }
    findOne(id) {
        return `This action returns a #${id} comment`;
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('댓글을 조회할 정보가 없습니다.');
        }
        const comment = await this.commentRepository.findOne({
            where: { idx: idx }
        });
        if (!(0, lodash_1.get)(comment, 'idx', '')) {
            throw new common_1.NotFoundException('조회된 댓글이 없습니다.');
        }
        return comment;
    }
    async update(idx, userInfo, updateCommentDto) {
        const commentInfo = await this.findOneIdx(idx);
        if (commentInfo['status'] == +statusDelete) {
            throw new common_1.UnprocessableEntityException('삭제된 댓글입니다.');
        }
        commentInfo['status'] = (0, lodash_1.get)(updateCommentDto, ['status'], commentInfo['status']);
        commentInfo['contents'] = (0, lodash_1.get)(updateCommentDto, ['contents'], commentInfo['contents']);
        const comment = await this.commentRepository.save(commentInfo);
        return { comment };
    }
    remove(id) {
        return `This action removes a #${id} comment`;
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.CommentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        board_contents_service_1.BoardContentsService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map