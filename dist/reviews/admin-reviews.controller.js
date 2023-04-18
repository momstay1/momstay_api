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
exports.AdminReviewsController = void 0;
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("./reviews.service");
const update_review_dto_1 = require("./dto/update-review.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const decorators_1 = require("@nestjs/common/decorators");
const platform_express_1 = require("@nestjs/platform-express");
const common_file_1 = require("../common/common.file");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const fs_1 = require("fs");
let AdminReviewsController = class AdminReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async adminFindAllProduct(take, page, search, order) {
        const { data, file_info } = await this.reviewsService.adminFindAllProduct({ take, page }, search, order);
        return Object.assign(Object.assign({}, data), { file_info });
    }
    async excelDownload(take, page, search, order, res) {
        const excel_file = await this.reviewsService.createExcel({ take, page }, search, order);
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="' + excel_file.file_name + '"',
        });
        (0, fs_1.createReadStream)(excel_file.file_path).pipe(res);
    }
    async findOne(idx) {
        return await this.reviewsService.findOne(+idx);
    }
    async statusChange(idxs, status) {
        return await this.reviewsService.statusChange(idxs, status);
    }
    async starChange(idxs, star) {
        return await this.reviewsService.starChange(idxs, star);
    }
    async update(idx, user, updateReviewDto, files) {
        return await this.reviewsService.update(idx, user, updateReviewDto, files);
    }
    async remove(user, idxs) {
        await this.reviewsService.remove(idxs, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '숙소 상세 후기 리스트 조회 API',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: 'search=status:상태값(-1:삭제|1:미등록|2:등록, 기본값:2)<br>' +
            'search=star:별점<br>' +
            'search=name:작성자명<br>' +
            'search=id:작성자id<br>' +
            'search=title:숙소 이름<br>' +
            'search=min_createdAt:최소날짜<br>' +
            'search=max_createdAt:최대날짜<br>',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'order',
        description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
        required: false,
    }),
    __param(0, (0, decorators_1.Query)('take')),
    __param(1, (0, decorators_1.Query)('page')),
    __param(2, (0, decorators_1.Query)('search')),
    __param(3, (0, decorators_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, String]),
    __metadata("design:returntype", Promise)
], AdminReviewsController.prototype, "adminFindAllProduct", null);
__decorate([
    (0, common_1.Get)('/excel'),
    (0, swagger_1.ApiOperation)({
        summary: '숙소 상세 후기 리스트 엑셀 다운로드 API',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: 'search=status:상태값(-1:삭제|1:미등록|2:등록, 기본값:2)<br>' +
            'search=star:별점<br>' +
            'search=name:작성자명<br>' +
            'search=min_createdAt:최소날짜<br>' +
            'search=max_createdAt:최대날짜<br>',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'order',
        description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
        required: false,
    }),
    __param(0, (0, decorators_1.Query)('take')),
    __param(1, (0, decorators_1.Query)('page')),
    __param(2, (0, decorators_1.Query)('search')),
    __param(3, (0, decorators_1.Query)('order')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, String, Object]),
    __metadata("design:returntype", Promise)
], AdminReviewsController.prototype, "excelDownload", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '후기 상세 조회 API' }),
    (0, swagger_1.ApiParam)({ name: 'idx', description: 'review idx' }),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminReviewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('status'),
    (0, swagger_1.ApiOperation)({
        summary: '후기 상태 일괄 수정 API',
        description: '',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        description: 'review idx를 배열로 전달 ex) [1,2,3]<br>' +
            'status 값 (-1: 삭제|1: 미등록|2: 등록)<br>' +
            '삭제 api 대신 사용 가능',
        schema: {
            properties: {
                idxs: {
                    example: [],
                },
                status: {
                    example: '',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)('idxs')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], AdminReviewsController.prototype, "statusChange", null);
__decorate([
    (0, common_1.Patch)('star'),
    (0, swagger_1.ApiOperation)({
        summary: '후기 평점 일괄 수정 API',
        description: '',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        description: 'review idx를 배열로 전달 ex) [1,2,3]<br>' +
            'star 값 (0 ~ 10)<br>' +
            '평점 5점 = 10, 평점 4점 = 8 ...',
        schema: {
            properties: {
                idxs: {
                    example: [],
                },
                star: {
                    example: '',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)('idxs')),
    __param(1, (0, common_1.Body)('star')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], AdminReviewsController.prototype, "starChange", null);
__decorate([
    (0, common_1.Patch)(':idx'),
    (0, swagger_1.ApiOperation)({
        summary: '후기 수정 API',
        description: 'status, star, content, reviewImg 만 변경 가능',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'idx', description: 'review idx' }),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'reviewImg', maxCount: 10 }], (0, common_file_1.multerOptions)())),
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
], AdminReviewsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: '후기 삭제 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        description: 'review idx를 배열로 전달 ex) [1,2,3]<br>' +
            '관리자 계정의 경우 여러 후기 한번에 삭제 가능<br>',
        schema: {
            properties: {
                idxs: {
                    example: [],
                },
            },
        },
    }),
    (0, decorators_1.HttpCode)(204),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)('idxs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, Array]),
    __metadata("design:returntype", Promise)
], AdminReviewsController.prototype, "remove", null);
AdminReviewsController = __decorate([
    (0, common_1.Controller)('admin/reviews'),
    (0, swagger_1.ApiTags)('후기(관리자) API'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], AdminReviewsController);
exports.AdminReviewsController = AdminReviewsController;
//# sourceMappingURL=admin-reviews.controller.js.map