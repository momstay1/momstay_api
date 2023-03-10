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
exports.MypageController = void 0;
const common_1 = require("@nestjs/common");
const mypage_service_1 = require("./mypage.service");
const create_mypage_dto_1 = require("./dto/create-mypage.dto");
const update_mypage_dto_1 = require("./dto/update-mypage.dto");
const role_decorator_1 = require("../common/decorator/role.decorator");
const swagger_1 = require("@nestjs/swagger");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const board_content_entity_1 = require("../board-contents/entities/board-content.entity");
const board_contents_service_1 = require("../board-contents/board-contents.service");
const reviews_service_1 = require("../reviews/reviews.service");
let MypageController = class MypageController {
    constructor(mypageService, boardContentsService, reviewsService) {
        this.mypageService = mypageService;
        this.boardContentsService = boardContentsService;
        this.reviewsService = reviewsService;
    }
    create(createMypageDto) {
        return this.mypageService.create(createMypageDto);
    }
    findAll() {
        return this.mypageService.findAll();
    }
    async findUserCategoryAll(user, bd_idx, category, take, page, order) {
        const { bc, bcats } = await this.boardContentsService.findUserCategoryAll(bd_idx, category, { take, page }, order, user);
        return Object.assign({ bcats }, bc);
    }
    async findAllUser(user, take, page, search, order) {
        const { data, file_info } = await this.reviewsService.findAllUser(user, { take, page }, search, order);
        return Object.assign(Object.assign({}, data), { file_info });
    }
    findOne(id) {
        return this.mypageService.findOne(+id);
    }
    update(id, updateMypageDto) {
        return this.mypageService.update(+id, updateMypageDto);
    }
    remove(id) {
        return this.mypageService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mypage_dto_1.CreateMypageDto]),
    __metadata("design:returntype", void 0)
], MypageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MypageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('bc/:bd_idx'),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '내가 작성한 글 리스트 API' }),
    (0, swagger_1.ApiCreatedResponse)({ type: board_content_entity_1.BoardContentsEntity }),
    (0, swagger_1.ApiQuery)({ name: "category", required: false }),
    (0, swagger_1.ApiQuery)({ name: "order", required: false }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('bd_idx')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('take')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, String, String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], MypageController.prototype, "findUserCategoryAll", null);
__decorate([
    (0, common_1.Get)('/reviews'),
    (0, swagger_1.ApiOperation)({ summary: '내가 작성한 후기 리스트 조회 API' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
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
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, Number, Number, Array, String]),
    __metadata("design:returntype", Promise)
], MypageController.prototype, "findAllUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MypageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_mypage_dto_1.UpdateMypageDto]),
    __metadata("design:returntype", void 0)
], MypageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MypageController.prototype, "remove", null);
MypageController = __decorate([
    (0, common_1.Controller)('mypage'),
    (0, swagger_1.ApiTags)('마이페이지 API'),
    __metadata("design:paramtypes", [mypage_service_1.MypageService,
        board_contents_service_1.BoardContentsService,
        reviews_service_1.ReviewsService])
], MypageController);
exports.MypageController = MypageController;
//# sourceMappingURL=mypage.controller.js.map