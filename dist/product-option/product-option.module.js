"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOptionModule = void 0;
const common_1 = require("@nestjs/common");
const product_option_service_1 = require("./product-option.service");
const product_option_controller_1 = require("./product-option.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_option_entity_1 = require("./entities/product-option.entity");
let ProductOptionModule = class ProductOptionModule {
};
ProductOptionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_option_entity_1.ProductOptionEntity]),
        ],
        controllers: [product_option_controller_1.ProductOptionController],
        providers: [product_option_service_1.ProductOptionService]
    })
], ProductOptionModule);
exports.ProductOptionModule = ProductOptionModule;
//# sourceMappingURL=product-option.module.js.map