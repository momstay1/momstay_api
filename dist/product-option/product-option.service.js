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
const product_service_1 = require("../product/product.service");
const file_service_1 = require("../file/file.service");
const exceptions_1 = require("@nestjs/common/exceptions");
const product_info_service_1 = require("../product-info/product-info.service");
let ProductOptionService = class ProductOptionService {
    constructor(productOptionRepository, productService, fileService, productInfoService) {
        this.productOptionRepository = productOptionRepository;
        this.productService = productService;
        this.fileService = fileService;
        this.productInfoService = productInfoService;
    }
    async create(createProductOptionDto, files) {
        let product;
        if ((0, lodash_1.get)(createProductOptionDto, 'productIdx', '')) {
            const productIdx = (0, lodash_1.get)(createProductOptionDto, 'productIdx');
            product = await this.productService.findIdxOne(+productIdx);
        }
        let productInfo;
        if ((0, lodash_1.get)(createProductOptionDto, 'productInfoIdx', '')) {
            const productInfoIdx = (0, lodash_1.get)(createProductOptionDto, 'productInfoIdx').split(",");
            productInfo = await this.productInfoService.findAllIdxs(productInfoIdx);
        }
        const product_option_data = {
            status: +(0, lodash_1.get)(createProductOptionDto, 'status', 0),
            type: (0, lodash_1.get)(createProductOptionDto, 'type', ''),
            order: '10',
            stayStatus: (0, lodash_1.get)(createProductOptionDto, 'stayStatus', '0'),
            visitStatus: (0, lodash_1.get)(createProductOptionDto, 'visitStatus', '0'),
            paymentStatus: (0, lodash_1.get)(createProductOptionDto, 'paymentStatus', '0'),
            title: (0, lodash_1.get)(createProductOptionDto, 'title', ''),
            price: +(0, lodash_1.get)(createProductOptionDto, 'price', 0),
            priceMonth: +(0, lodash_1.get)(createProductOptionDto, 'priceMonth', 0),
            priceWeek: +(0, lodash_1.get)(createProductOptionDto, 'priceWeek', 0),
            priceDay: +(0, lodash_1.get)(createProductOptionDto, 'priceDay', 0),
            detailsKor: (0, lodash_1.get)(createProductOptionDto, 'detailsKor', ''),
            detailsEng: (0, lodash_1.get)(createProductOptionDto, 'detailsEng', ''),
            detailsJpn: (0, lodash_1.get)(createProductOptionDto, 'detailsJpn', ''),
            detailsChn: (0, lodash_1.get)(createProductOptionDto, 'detailsChn', ''),
            product: product,
            productInfo: productInfo,
        };
        if ((0, lodash_1.get)(createProductOptionDto, 'idx', '')) {
            product_option_data['idx'] = +(0, lodash_1.get)(createProductOptionDto, 'idx');
        }
        const productOptionEntity = await this.productOptionRepository.create(product_option_data);
        const productOption = await this.productOptionRepository.save(productOptionEntity);
        productOption['product'] = product;
        productOption['productInfo'] = productInfo;
        const fileIdx = (0, lodash_1.get)(createProductOptionDto, 'filesIdx', '');
        let fileIdxs = [];
        if (fileIdx) {
            try {
                const productOptionFileIdxs = (0, lodash_1.map)(await this.fileService.findCategory(["roomDetailImg"], "" + productOption['idx']), (o) => "" + o.file_idx);
                fileIdxs = fileIdx.split(",");
                const delFileIdxs = productOptionFileIdxs.filter(o => !fileIdxs.includes(o));
                if (delFileIdxs.length > 0) {
                    await this.fileService.removes(delFileIdxs);
                }
            }
            catch (error) {
                console.log({ error });
            }
        }
        let new_file;
        if (!(0, lodash_1.isEmpty)(files)) {
            new_file = await this.fileService.fileInfoInsert(files, productOption['idx']);
            fileIdxs = (0, lodash_1.union)(fileIdxs, ...(0, lodash_1.map)(new_file[product_option_data['idx']], (obj) => (0, lodash_1.map)(obj, o => "" + o.file_idx)));
        }
        let file_info;
        if (fileIdxs.length > 0) {
            file_info = await this.fileService.findIndexs(fileIdxs);
        }
        return { productOption, file_info };
    }
    async findAll(options, search) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        const [results, total] = await this.productOptionRepository.createQueryBuilder('product_option')
            .leftJoinAndSelect('product_option.product', 'product')
            .leftJoinAndSelect('product_option.productInfo', 'productInfo')
            .leftJoinAndSelect('product_info_product_product', 'product_info_to_product', '`product`.idx = `product_info_to_product`.productIdx')
            .leftJoinAndSelect('product_info', 'product_info', '`product_info`.idx = `product_info_to_product`.productInfoIdx')
            .where((qb) => {
            qb.where('`product_option`.status = :status', { status: 2 });
            (0, lodash_1.get)(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: (0, lodash_1.get)(where, 'title') });
            (0, lodash_1.get)(where, 'product_idx', '') && qb.andWhere('`product_option`.`productIdx` = :product_idx', { product_idx: (0, lodash_1.get)(where, 'product_idx') });
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
    async findOne(idx) {
        return await this.findIdx(idx);
    }
    async findIdx(idx) {
        if (!idx) {
            throw new exceptions_1.NotFoundException('잘못된 정보 입니다.');
        }
        const productOption = await this.productOptionRepository.findOne({
            where: { idx: idx },
            relations: ['product', 'product.productInfo', 'productInfo']
        });
        if (!productOption.idx) {
            throw new exceptions_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return productOption;
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_service_1.ProductService,
        file_service_1.FileService,
        product_info_service_1.ProductInfoService])
], ProductOptionService);
exports.ProductOptionService = ProductOptionService;
//# sourceMappingURL=product-option.service.js.map