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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const file_service_1 = require("../file/file.service");
const paginate_1 = require("../paginate");
const product_info_service_1 = require("../product-info/product-info.service");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductService = class ProductService {
    constructor(productRepository, fileService, productInfoService, userService) {
        this.productRepository = productRepository;
        this.fileService = fileService;
        this.productInfoService = productInfoService;
        this.userService = userService;
    }
    async create(createProductDto, files) {
        let productInfo;
        if ((0, lodash_1.get)(createProductDto, 'productInfoIdx', '')) {
            const productInfoIdx = (0, lodash_1.get)(createProductDto, 'productInfoIdx').split(",");
            productInfo = await this.productInfoService.findAllIdxs(productInfoIdx);
        }
        const userIdx = (0, lodash_1.get)(createProductDto, 'userIdx');
        const user = await this.userService.findIdx(+userIdx);
        const product_data = {
            status: +(0, lodash_1.get)(createProductDto, 'status', 0),
            type: (0, lodash_1.get)(createProductDto, 'type', ''),
            order: '10',
            membership: (0, lodash_1.get)(createProductDto, 'membership', '0'),
            hostBusiness: (0, lodash_1.get)(createProductDto, 'hostBusiness', ''),
            title: (0, lodash_1.get)(createProductDto, 'title', ''),
            postCode: (0, lodash_1.get)(createProductDto, 'postCode', ''),
            addr1: (0, lodash_1.get)(createProductDto, 'addr1', ''),
            addr2: (0, lodash_1.get)(createProductDto, 'addr2', ''),
            language: (0, lodash_1.get)(createProductDto, 'language', ''),
            metro: (0, lodash_1.get)(createProductDto, 'metro', ''),
            lat: (0, lodash_1.get)(createProductDto, 'lat', ''),
            lng: (0, lodash_1.get)(createProductDto, 'lng', ''),
            college: (0, lodash_1.get)(createProductDto, 'college', ''),
            detailsKor: (0, lodash_1.get)(createProductDto, 'detailsKor', ''),
            detailsEng: (0, lodash_1.get)(createProductDto, 'detailsEng', ''),
            detailsJpn: (0, lodash_1.get)(createProductDto, 'detailsJpn', ''),
            detailsChn: (0, lodash_1.get)(createProductDto, 'detailsChn', ''),
            user: user,
            productInfo: productInfo,
        };
        if ((0, lodash_1.get)(createProductDto, 'idx', '')) {
            product_data['idx'] = +(0, lodash_1.get)(createProductDto, 'idx');
        }
        const productEntity = await this.productRepository.create(product_data);
        const product = await this.productRepository.save(productEntity);
        const fileIdx = (0, lodash_1.get)(createProductDto, 'filesIdx', '');
        let fileIdxs = [];
        if (fileIdx) {
            try {
                const productFileIdxs = (0, lodash_1.map)(await this.fileService.findCategory(["lodgingDetailImg", "mealsImg"], "" + product['idx']), (o) => "" + o.file_idx);
                fileIdxs = fileIdx.split(",");
                const delFileIdxs = productFileIdxs.filter(o => !fileIdxs.includes(o));
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
            new_file = await this.fileService.fileInfoInsert(files, product['idx']);
            fileIdxs = (0, lodash_1.union)(fileIdxs, ...(0, lodash_1.map)(new_file[product_data['idx']], (obj) => (0, lodash_1.map)(obj, o => "" + o.file_idx)));
        }
        let file_info;
        if (fileIdxs.length > 0) {
            file_info = await this.fileService.findIndexs(fileIdxs);
        }
        return { product, file_info };
    }
    async findAll(options, search) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        const [results, total] = await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.productOption', 'product_option')
            .leftJoinAndSelect('product_info_product_product', 'product_info_to_product', '`product`.idx = `product_info_to_product`.productIdx')
            .leftJoinAndSelect('product_info', 'product_info', '`product_info`.idx = `product_info_to_product`.productInfoIdx')
            .where((qb) => {
            qb.where('`product`.status = :status', { status: (0, lodash_1.get)(where, 'status', '2') });
            (0, lodash_1.get)(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: (0, lodash_1.get)(where, 'membership') });
            (0, lodash_1.get)(where, 'user_idx', '') && qb.andWhere('`product`.`userIdx` = :user_idx', { user_idx: (0, lodash_1.get)(where, 'user_idx') });
            if ((0, lodash_1.get)(where, 'keyword', '')) {
                qb.orWhere('`product`.`title` LIKE :title', { title: '%' + (0, lodash_1.get)(where, 'keyword') + '%' });
                qb.orWhere('`product`.`addr1` LIKE :addr1', { addr1: '%' + (0, lodash_1.get)(where, 'keyword') + '%' });
                qb.orWhere('`product`.`addr2` LIKE :addr2', { addr2: '%' + (0, lodash_1.get)(where, 'keyword') + '%' });
                qb.orWhere('`product`.`metro` LIKE :metro', { metro: '%' + (0, lodash_1.get)(where, 'keyword') + '%' });
                qb.orWhere('`product`.`college` LIKE :college', { college: '%' + (0, lodash_1.get)(where, 'keyword') + '%' });
            }
        })
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        return new paginate_1.Pagination({
            results,
            total,
        });
    }
    async findIdxAll(idx) {
        const product = await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.productOption', 'product_option')
            .leftJoinAndSelect('product_info_product_product', 'product_info_to_product', '`product`.idx = `product_info_to_product`.productIdx')
            .leftJoinAndSelect('product_info', 'product_info', '`product_info`.idx = `product_info_to_product`.productInfoIdx')
            .where((qb) => {
            qb.where('`product_option`.status = :status', { status: 2 });
            qb.andWhere('`product`.idx IN (:idx)', { idx: idx });
        })
            .getMany();
        return product;
    }
    async findOne(idx) {
        return await this.findIdxOne(idx);
    }
    async findIdxOne(idx) {
        if (!idx) {
            throw new exceptions_1.NotFoundException('잘못된 정보 입니다.');
        }
        const product = await this.productRepository.findOne({
            where: { idx: idx },
            relations: ['productInfo']
        });
        if (!product.idx) {
            throw new exceptions_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return product;
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_service_1.FileService,
        product_info_service_1.ProductInfoService,
        users_service_1.UsersService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map