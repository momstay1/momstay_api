"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistModule = void 0;
const common_1 = require("@nestjs/common");
const wishlist_service_1 = require("./wishlist.service");
const wishlist_controller_1 = require("./wishlist.controller");
const typeorm_1 = require("@nestjs/typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const product_module_1 = require("../product/product.module");
const users_module_1 = require("../users/users.module");
const file_module_1 = require("../file/file.module");
let WishlistModule = class WishlistModule {
};
WishlistModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([wishlist_entity_1.WishlistEntity]),
            users_module_1.UsersModule,
            product_module_1.ProductModule,
            file_module_1.FileModule
        ],
        controllers: [wishlist_controller_1.WishlistController],
        providers: [wishlist_service_1.WishlistService]
    })
], WishlistModule);
exports.WishlistModule = WishlistModule;
//# sourceMappingURL=wishlist.module.js.map