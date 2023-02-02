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
exports.ProductOptionController = void 0;
const common_1 = require("@nestjs/common");
const product_option_service_1 = require("./product-option.service");
const create_product_option_dto_1 = require("./dto/create-product-option.dto");
const update_product_option_dto_1 = require("./dto/update-product-option.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("@nestjs/common/decorators");
const common_file_1 = require("../common/common.file");
const platform_express_1 = require("@nestjs/platform-express");
const role_decorator_1 = require("../common/decorator/role.decorator");
let ProductOptionController = class ProductOptionController {
    constructor(productOptionService) {
        this.productOptionService = productOptionService;
    }
    async create(createProductOptionDto, files) {
        return await this.productOptionService.create(createProductOptionDto, files);
    }
    async findAll(take, page, search) {
        const { results, total, pageTotal } = await this.productOptionService.findAll({ take, page }, search);
        return {
            results,
            total,
            pageTotal
        };
    }
    async findOne(idx) {
        return await this.productOptionService.findOne(+idx);
    }
    update(id, updateProductOptionDto) {
        return this.productOptionService.update(+id, updateProductOptionDto);
    }
    remove(id) {
        return this.productOptionService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '방 생성 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'roomDetailImg', maxCount: 5 },
    ], (0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_option_dto_1.CreateProductOptionDto,
        Array]),
    __metadata("design:returntype", Promise)
], ProductOptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '방 리스트 조회 API',
    }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        description: "search=membership:(0:무료|1:유료)<br>"
            + "search=title:string<br>"
            + "search=addr1:string<br>"
            + "search=addr2:string<br>"
            + "search=metro:string<br>"
            + "search=college:string<br>"
            + "search=product_idx:숙소idx<br>",
        required: false
    }),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array]),
    __metadata("design:returntype", Promise)
], ProductOptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '방 상세 조회 API' }),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductOptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_option_dto_1.UpdateProductOptionDto]),
    __metadata("design:returntype", void 0)
], ProductOptionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductOptionController.prototype, "remove", null);
ProductOptionController = __decorate([
    (0, common_1.Controller)('product-option'),
    (0, swagger_1.ApiTags)('방 API'),
    __metadata("design:paramtypes", [product_option_service_1.ProductOptionService])
], ProductOptionController);
exports.ProductOptionController = ProductOptionController;
//# sourceMappingURL=product-option.controller.js.map