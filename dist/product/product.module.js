"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const product_entity_1 = require("./entities/product.entity");
const typeorm_1 = require("@nestjs/typeorm");
const file_module_1 = require("../file/file.module");
const product_info_module_1 = require("../product-info/product-info.module");
const users_module_1 = require("../users/users.module");
const admin_product_controller_1 = require("./admin-product.controller");
const metro_module_1 = require("../metro/metro.module");
const college_module_1 = require("../college/college.module");
const excel_service_1 = require("../excel/excel.service");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.ProductEntity]),
            file_module_1.FileModule,
            product_info_module_1.ProductInfoModule,
            users_module_1.UsersModule,
            metro_module_1.MetroModule,
            college_module_1.CollegeModule,
        ],
        controllers: [product_controller_1.ProductController, admin_product_controller_1.AdminProductController],
        providers: [product_service_1.ProductService, excel_service_1.ExcelService],
        exports: [product_service_1.ProductService]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map