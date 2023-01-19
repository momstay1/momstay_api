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
exports.ProductOptionService = void 0;
const common_1 = require("@nestjs/common");
const paginate_1 = require("../paginate");
const common_utils_1 = require("../common/common.utils");
const typeorm_1 = require("@nestjs/typeorm");
const product_option_entity_1 = require("./entities/product-option.entity");
const typeorm_2 = require("typeorm");
const lodash_1 = require("lodash");
let ProductOptionService = class ProductOptionService {
    constructor(productOptionRepository) {
        this.productOptionRepository = productOptionRepository;
    }
    create(createProductOptionDto) {
        return 'This action adds a new productOption';
    }
    async findAll(options, search) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        const [results, total] = await this.productOptionRepository.createQueryBuilder('product_option')
            .leftJoinAndSelect('product_option.product', 'product')
            .leftJoinAndSelect('product_info_product_product', 'product_info_to_product', '`product`.idx = `product_info_to_product`.productIdx')
            .leftJoinAndSelect('product_info', 'product_info', '`product_info`.idx = `product_info_to_product`.productInfoIdx')
            .where((qb) => {
            qb.where('`product_option`.status = :status', { status: 2 });
            (0, lodash_1.get)(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: (0, lodash_1.get)(where, 'title') });
            (0, lodash_1.get)(where, 'title', '') && qb.andWhere('`product`.`title` LIKE :title', { title: '%' + (0, lodash_1.get)(where, 'title') + '%' });
            (0, lodash_1.get)(where, 'addr1', '') && qb.andWhere('`product`.`addr1` LIKE :addr1', { addr1: '%' + (0, lodash_1.get)(where, 'addr1') + '%' });
            (0, lodash_1.get)(where, 'addr2', '') && qb.andWhere('`product`.`addr2` LIKE :addr2', { addr2: '%' + (0, lodash_1.get)(where, 'addr2') + '%' });
            (0, lodash_1.get)(where, 'metro', '') && qb.andWhere('`product`.`metro` LIKE :metro', { metro: '%' + (0, lodash_1.get)(where, 'metro') + '%' });
            (0, lodash_1.get)(where, 'college', '') && qb.andWhere('`product`.`college` LIKE :college', { college: '%' + (0, lodash_1.get)(where, 'college') + '%' });
        })
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        return new paginate_1.Pagination({
            results,
            total,
        });
    }
    findOne(id) {
        return `This action returns a #${id} productOption`;
    }
    update(id, updateProductOptionDto) {
        return `This action updates a #${id} productOption`;
    }
    remove(id) {
        return `This action removes a #${id} productOption`;
    }
};
ProductOptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_option_entity_1.ProductOptionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductOptionService);
exports.ProductOptionService = ProductOptionService;
//# sourceMappingURL=product-option.service.js.map