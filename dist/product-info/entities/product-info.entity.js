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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInfoEntity = void 0;
const product_entity_1 = require("../../product/entities/product.entity");
const typeorm_1 = require("typeorm");
let ProductInfoEntity = class ProductInfoEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductInfoEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2 }),
    __metadata("design:type", Number)
], ProductInfoEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductInfoEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ProductInfoEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_entity_1.ProductEntity, (product) => product.productInfo),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ProductInfoEntity.prototype, "product", void 0);
ProductInfoEntity = __decorate([
    (0, typeorm_1.Entity)('product_info')
], ProductInfoEntity);
exports.ProductInfoEntity = ProductInfoEntity;
//# sourceMappingURL=product-info.entity.js.map