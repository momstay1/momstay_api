"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerModule = void 0;
const common_1 = require("@nestjs/common");
const banner_service_1 = require("./banner.service");
const banner_controller_1 = require("./banner.controller");
const typeorm_1 = require("@nestjs/typeorm");
const banner_entity_1 = require("./entities/banner.entity");
const file_module_1 = require("../file/file.module");
const banner_item_module_1 = require("../banner-item/banner-item.module");
let BannerModule = class BannerModule {
};
BannerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([banner_entity_1.BannerEntity]),
            file_module_1.FileModule,
            (0, common_1.forwardRef)(() => banner_item_module_1.BannerItemModule),
        ],
        controllers: [banner_controller_1.BannerController],
        providers: [banner_service_1.BannerService],
        exports: [banner_service_1.BannerService]
    })
], BannerModule);
exports.BannerModule = BannerModule;
//# sourceMappingURL=banner.module.js.map