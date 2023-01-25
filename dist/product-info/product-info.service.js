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
exports.ProductInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_info_entity_1 = require("./entities/product-info.entity");
let ProductInfoService = class ProductInfoService {
    constructor(productInfoRepository) {
        this.productInfoRepository = productInfoRepository;
    }
    create(createProductInfoDto) {
        return 'This action adds a new productInfo';
    }
    async findAll() {
        const productInfo = await this.productInfoRepository.find({
            where: { status: 2 }
        });
        if (productInfo.length <= 0) {
            throw new common_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return productInfo;
    }
    async findAllIdxs(idxs) {
        if (idxs.length <= 0) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const productInfo = await this.productInfoRepository.find({
            where: { idx: (0, typeorm_2.In)(idxs) }
        });
        if (productInfo.length <= 0) {
            throw new common_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return productInfo;
    }
    findOne(id) {
        return `This action returns a #${id} productInfo`;
    }
    update(id, updateProductInfoDto) {
        return `This action updates a #${id} productInfo`;
    }
    remove(id) {
        return `This action removes a #${id} productInfo`;
    }
};
ProductInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_info_entity_1.ProductInfoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductInfoService);
exports.ProductInfoService = ProductInfoService;
//# sourceMappingURL=product-info.service.js.map