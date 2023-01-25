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
exports.ProductInfoController = void 0;
const common_1 = require("@nestjs/common");
const product_info_service_1 = require("./product-info.service");
const create_product_info_dto_1 = require("./dto/create-product-info.dto");
const update_product_info_dto_1 = require("./dto/update-product-info.dto");
const swagger_1 = require("@nestjs/swagger");
let ProductInfoController = class ProductInfoController {
    constructor(productInfoService) {
        this.productInfoService = productInfoService;
    }
    create(createProductInfoDto) {
        return this.productInfoService.create(createProductInfoDto);
    }
    async findAll() {
        return await this.productInfoService.findAll();
    }
    findOne(id) {
        return this.productInfoService.findOne(+id);
    }
    update(id, updateProductInfoDto) {
        return this.productInfoService.update(+id, updateProductInfoDto);
    }
    remove(id) {
        return this.productInfoService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_info_dto_1.CreateProductInfoDto]),
    __metadata("design:returntype", void 0)
], ProductInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '숙소 샐활 및 편의 API',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductInfoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductInfoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_info_dto_1.UpdateProductInfoDto]),
    __metadata("design:returntype", void 0)
], ProductInfoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductInfoController.prototype, "remove", null);
ProductInfoController = __decorate([
    (0, common_1.Controller)('product-info'),
    (0, swagger_1.ApiTags)('숙소 생활 및 편의 API'),
    __metadata("design:paramtypes", [product_info_service_1.ProductInfoService])
], ProductInfoController);
exports.ProductInfoController = ProductInfoController;
//# sourceMappingURL=product-info.controller.js.map