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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("./reviews.service");
const create_review_dto_1 = require("./dto/create-review.dto");
const update_review_dto_1 = require("./dto/update-review.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const decorators_1 = require("@nestjs/common/decorators");
const platform_express_1 = require("@nestjs/platform-express");
const common_file_1 = require("../common/common.file");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async create(user, createReviewDto, files) {
        return await this.reviewsService.create(user, createReviewDto, files);
    }
    async test() {
    }
    async findAllProduct(idx, take, page, search, order) {
        const { data, file_info } = await this.reviewsService.findAllProduct(idx, { take, page }, search, order);
        return Object.assign(Object.assign({}, data), { file_info });
    }
    async findOne(idx) {
        return await this.reviewsService.findOne(+idx);
    }
    async update(idx, user, updateReviewDto, files) {
        return await this.reviewsService.update(idx, user, updateReviewDto, files);
    }
    async statusUpdate(user, idxs) {
        await this.reviewsService.statusUpdate(idxs, user);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '후기 등록 API' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'reviewImg', maxCount: 10 },
    ], (0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity,
        create_review_dto_1.CreateReviewDto,
        Array]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "test", null);
__decorate([
    (0, common_1.Get)('/product/:idx'),
    (0, swagger_1.ApiOperation)({
        summary: '숙소 상세 후기 리스트 조회 API',
    }),
    (0, swagger_1.ApiParam)({
        name: "idx",
        description: 'product idx값',
    }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        description: 'search=status:상태값(1:삭제|2:등록, 기본값:2)<br>',
        required: false
    }),
    (0, swagger_1.ApiQuery)({
        name: "order",
        description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
        required: false
    }),
    __param(0, (0, common_1.Param)('idx')),
    __param(1, (0, decorators_1.Query)('take')),
    __param(2, (0, decorators_1.Query)('page')),
    __param(3, (0, decorators_1.Query)('search')),
    __param(4, (0, decorators_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Array, String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findAllProduct", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '후기 상세 조회 API' }),
    (0, swagger_1.ApiParam)({ name: 'idx', description: 'review idx' }),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':idx'),
    (0, swagger_1.ApiOperation)({
        summary: '후기 수정 API',
        description: 'status, star, content, reviewImg 만 변경 가능'
    }),
    (0, swagger_1.ApiParam)({ name: 'idx', description: 'review idx' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'reviewImg', maxCount: 10 },
    ], (0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Param)('idx')),
    __param(1, (0, getuser_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, decorators_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UsersEntity,
        update_review_dto_1.UpdateReviewDto,
        Array]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: '후기 삭제 API' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        description: 'review idx를 배열로 전달 ex) [1,2,3]<br>'
            + '관리자 계정의 경우 여러 후기 한번에 삭제 가능<br>'
            + '일반 사용자의 경우 1개만 삭제 가능',
        schema: {
            properties: {
                idxs: {
                    example: [],
                }
            }
        }
    }),
    (0, decorators_1.HttpCode)(204),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)('idxs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, Array]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "statusUpdate", null);
ReviewsController = __decorate([
    (0, common_1.Controller)('reviews'),
    (0, swagger_1.ApiTags)('후기 API'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
exports.ReviewsController = ReviewsController;
//# sourceMappingURL=reviews.controller.js.map