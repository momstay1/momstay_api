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
exports.BannerItemController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const common_file_1 = require("../common/common.file");
const role_decorator_1 = require("../common/decorator/role.decorator");
const banner_item_service_1 = require("./banner-item.service");
const create_banner_item_dto_1 = require("./dto/create-banner-item.dto");
const update_banner_item_dto_1 = require("./dto/update-banner-item.dto");
let BannerItemController = class BannerItemController {
    constructor(bannerItemService) {
        this.bannerItemService = bannerItemService;
    }
    async create(createBannerItemDto, files) {
        return await this.bannerItemService.create(createBannerItemDto, files);
    }
    findAll() {
        return this.bannerItemService.findAll();
    }
    findOne(id) {
        return this.bannerItemService.findOne(+id);
    }
    update(id, updateBannerItemDto) {
        return this.bannerItemService.update(+id, updateBannerItemDto);
    }
    remove(id) {
        return this.bannerItemService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '배너 아이템 등록 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'bniImg', maxCount: 10 },
    ], (0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banner_item_dto_1.CreateBannerItemDto,
        Array]),
    __metadata("design:returntype", Promise)
], BannerItemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BannerItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BannerItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_banner_item_dto_1.UpdateBannerItemDto]),
    __metadata("design:returntype", void 0)
], BannerItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BannerItemController.prototype, "remove", null);
BannerItemController = __decorate([
    (0, common_1.Controller)('banner-item'),
    (0, swagger_1.ApiTags)('배너 아이템 API'),
    __metadata("design:paramtypes", [banner_item_service_1.BannerItemService])
], BannerItemController);
exports.BannerItemController = BannerItemController;
//# sourceMappingURL=banner-item.controller.js.map