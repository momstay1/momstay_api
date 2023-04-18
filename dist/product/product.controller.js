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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const common_file_1 = require("../common/common.file");
const getuser_decorator_1 = require("../auth/getuser.decorator");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async test(id) {
        const data = await this.productService.test(id);
        return data;
    }
    async create(createProductDto, files) {
        return await this.productService.create(createProductDto, files);
    }
    async findAll(take, page, search, order) {
        const { data, file_info } = await this.productService.findAll({ take, page }, search, order);
        return Object.assign(Object.assign({}, data), { file_info });
    }
    async findOne(idx) {
        return await this.productService.findOne(+idx);
    }
    update(id, updateProductDto) {
        return this.productService.update(+id, updateProductDto);
    }
    remove(user, idx) {
        return this.productService.hostRemove(user, +idx);
    }
};
__decorate([
    (0, common_1.Get)('test/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "test", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '숙소 등록 API',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'lodgingDetailImg', maxCount: 5 },
        { name: 'mealsImg', maxCount: 5 },
    ], (0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto,
        Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '숙소 리스트 조회 API' }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        description: 'search=membership:(0|1)<br>'
            + 'search=keyword:메인검색<br>'
            + 'search=user_idx:회원idx<br>'
            + 'search=status:상태값(-1:삭제|0:미등록|1:미사용|2:사용)<br>'
            + 'search=stayStatus:상태값(1:공실|2:만실)<br>'
            + 'search=min_priceMonth:월 최소 가격<br>'
            + 'search=max_priceMonth:월 최대 가격<br>'
            + 'search=product_info:편의시설 idx(2,3,4)<br>',
        required: false
    }),
    (0, swagger_1.ApiQuery)({
        name: "order",
        description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
        required: false
    }),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '숙소 상세 조회 API' }),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '숙소 삭제 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(204),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "remove", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    (0, swagger_1.ApiTags)('숙소 API'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map