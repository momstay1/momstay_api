"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerItemModule = void 0;
const common_1 = require("@nestjs/common");
const banner_item_service_1 = require("./banner-item.service");
const banner_item_controller_1 = require("./banner-item.controller");
const typeorm_1 = require("@nestjs/typeorm");
const banner_item_entity_1 = require("./entities/banner-item.entity");
const file_module_1 = require("../file/file.module");
const banner_module_1 = require("../banner/banner.module");
let BannerItemModule = class BannerItemModule {
};
BannerItemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([banner_item_entity_1.BannerItemEntity]),
            (0, common_1.forwardRef)(() => banner_module_1.BannerModule),
            file_module_1.FileModule,
        ],
        controllers: [banner_item_controller_1.BannerItemController],
        providers: [banner_item_service_1.BannerItemService],
        exports: [banner_item_service_1.BannerItemService]
    })
], BannerItemModule);
exports.BannerItemModule = BannerItemModule;
//# sourceMappingURL=banner-item.module.js.map