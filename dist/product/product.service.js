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
const college_service_1 = require("../college/college.service");
const common_utils_1 = require("../common/common.utils");
const file_service_1 = require("../file/file.service");
const metro_service_1 = require("../metro/metro.service");
const paginate_1 = require("../paginate");
const product_info_service_1 = require("../product-info/product-info.service");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const excel_service_1 = require("../excel/excel.service");
const deleteStatus = -1;
const unregisteredStatus = 0;
const notUsedStatus = 1;
const registrationStatus = 2;
let ProductService = class ProductService {
    constructor(productRepository, fileService, productInfoService, userService, metroService, collegeService, excelService) {
        this.productRepository = productRepository;
        this.fileService = fileService;
        this.productInfoService = productInfoService;
        this.userService = userService;
        this.metroService = metroService;
        this.collegeService = collegeService;
        this.excelService = excelService;
    }
    async test(id) {
        const code = await this.productCreateCode();
        console.log({ code });
        return code;
    }
    async create(createProductDto, files) {
        let productInfo;
        let product_info_idxs;
        if ((0, lodash_1.get)(createProductDto, 'productInfoIdx', '') && createProductDto.productInfoIdx != 'null') {
            const productInfoIdx = (0, lodash_1.get)(createProductDto, 'productInfoIdx').split(',');
            productInfo = await this.productInfoService.findAllIdxs(productInfoIdx);
            product_info_idxs = (0, lodash_1.sortBy)((0, lodash_1.map)(productInfoIdx, (o) => +o));
        }
        let prd;
        if ((0, lodash_1.get)(createProductDto, 'idx', '')) {
            try {
                prd = await this.findOneIdx(+(0, lodash_1.get)(createProductDto, 'idx'));
            }
            catch (error) {
                console.log({ error });
            }
        }
        const userIdx = (0, lodash_1.get)(createProductDto, 'userIdx');
        const user = await this.userService.findIdx(+userIdx);
        let metro = [];
        let college = [];
        if ((0, lodash_1.get)(createProductDto, 'metro', '')) {
            try {
                const metro_idxs = (0, lodash_1.map)((0, lodash_1.get)(createProductDto, 'metro').split(','), (o) => +o);
                metro = await this.metroService.findAllIdx(metro_idxs);
            }
            catch (error) {
                console.log({ error });
            }
        }
        if ((0, lodash_1.get)(createProductDto, 'college', '')) {
            try {
                const college_idxs = (0, lodash_1.map)((0, lodash_1.get)(createProductDto, 'college').split(','), (o) => +o);
                college = await this.collegeService.findAllIdx(college_idxs);
            }
            catch (error) {
                console.log({ error });
            }
        }
        const product_data = {
            order: '10',
            code: await this.productCreateCode(),
            metro: metro,
            college: college,
            user: user,
            productInfo: productInfo,
            productInfoIdxs: '',
        };
        if (prd) {
            product_data['order'] = prd['order'];
            product_data['code'] = prd['code'];
        }
        else {
            product_data['order'] = '10';
            product_data['code'] = await this.productCreateCode();
        }
        if ((0, lodash_1.get)(createProductDto, 'idx', ''))
            product_data['idx'] = +(0, lodash_1.get)(createProductDto, 'idx');
        if ((0, lodash_1.get)(createProductDto, 'status', 0))
            product_data['status'] = +(0, lodash_1.get)(createProductDto, 'status');
        if ((0, lodash_1.get)(createProductDto, 'type', ''))
            product_data['type'] = (0, lodash_1.get)(createProductDto, 'type');
        if ((0, lodash_1.get)(createProductDto, 'membership', ''))
            product_data['membership'] = (0, lodash_1.get)(createProductDto, 'membership');
        if ((0, lodash_1.get)(createProductDto, 'hostBusiness', ''))
            product_data['hostBusiness'] = (0, lodash_1.get)(createProductDto, 'hostBusiness');
        if ((0, lodash_1.get)(createProductDto, 'title', ''))
            product_data['title'] = (0, lodash_1.get)(createProductDto, 'title');
        if ((0, lodash_1.get)(createProductDto, 'titleEng', ''))
            product_data['titleEng'] = (0, lodash_1.get)(createProductDto, 'titleEng');
        if ((0, lodash_1.get)(createProductDto, 'titleJpn', ''))
            product_data['titleJpn'] = (0, lodash_1.get)(createProductDto, 'titleJpn');
        if ((0, lodash_1.get)(createProductDto, 'titleChn', ''))
            product_data['titleChn'] = (0, lodash_1.get)(createProductDto, 'titleChn');
        if ((0, lodash_1.get)(createProductDto, 'postCode', ''))
            product_data['postCode'] = (0, lodash_1.get)(createProductDto, 'postCode');
        if ((0, lodash_1.get)(createProductDto, 'addr1', ''))
            product_data['addr1'] = (0, lodash_1.get)(createProductDto, 'addr1');
        if ((0, lodash_1.get)(createProductDto, 'addr1Eng', ''))
            product_data['addr1Eng'] = (0, lodash_1.get)(createProductDto, 'addr1Eng');
        if ((0, lodash_1.get)(createProductDto, 'addr1Jpn', ''))
            product_data['addr1Jpn'] = (0, lodash_1.get)(createProductDto, 'addr1Jpn');
        if ((0, lodash_1.get)(createProductDto, 'addr1Chn', ''))
            product_data['addr1Chn'] = (0, lodash_1.get)(createProductDto, 'addr1Chn');
        if ((0, lodash_1.get)(createProductDto, 'addr2', ''))
            product_data['addr2'] = (0, lodash_1.get)(createProductDto, 'addr2');
        if ((0, lodash_1.get)(createProductDto, 'addr2Eng', ''))
            product_data['addr2Eng'] = (0, lodash_1.get)(createProductDto, 'addr2Eng');
        if ((0, lodash_1.get)(createProductDto, 'addr2Jpn', ''))
            product_data['addr2Jpn'] = (0, lodash_1.get)(createProductDto, 'addr2Jpn');
        if ((0, lodash_1.get)(createProductDto, 'addr2Chn', ''))
            product_data['addr2Chn'] = (0, lodash_1.get)(createProductDto, 'addr2Chn');
        if ((0, lodash_1.get)(createProductDto, 'language', ''))
            product_data['language'] = (0, lodash_1.get)(createProductDto, 'language');
        if ((0, lodash_1.get)(createProductDto, 'lat', ''))
            product_data['lat'] = (0, lodash_1.get)(createProductDto, 'lat');
        if ((0, lodash_1.get)(createProductDto, 'lng', ''))
            product_data['lng'] = (0, lodash_1.get)(createProductDto, 'lng');
        if ((0, lodash_1.get)(createProductDto, 'detailsKor', ''))
            product_data['detailsKor'] = (0, lodash_1.get)(createProductDto, 'detailsKor');
        if ((0, lodash_1.get)(createProductDto, 'detailsEng', ''))
            product_data['detailsEng'] = (0, lodash_1.get)(createProductDto, 'detailsEng');
        if ((0, lodash_1.get)(createProductDto, 'detailsJpn', ''))
            product_data['detailsJpn'] = (0, lodash_1.get)(createProductDto, 'detailsJpn');
        if ((0, lodash_1.get)(createProductDto, 'detailsChn', ''))
            product_data['detailsChn'] = (0, lodash_1.get)(createProductDto, 'detailsChn');
        if ((0, lodash_1.get)(createProductDto, 'status', ''))
            product_data['status'] = +(0, lodash_1.get)(createProductDto, 'status');
        if ((0, lodash_1.get)(createProductDto, 'status', ''))
            product_data['status'] = +(0, lodash_1.get)(createProductDto, 'status');
        if (product_info_idxs && (0, lodash_1.isArray)(product_info_idxs)) {
            product_data['productInfoIdxs'] = product_info_idxs.join(',');
        }
        const productEntity = await this.productRepository.create(product_data);
        const product = await this.productRepository.save(productEntity);
        const fileIdx = (0, lodash_1.get)(createProductDto, 'filesIdx', '');
        let fileIdxs = [];
        if (fileIdx) {
            console.log('-----------------------파일 제거-----------------------');
            console.log({ fileIdx });
            try {
                const productFileIdxs = (0, lodash_1.map)(await this.fileService.findCategory(['lodgingDetailImg', 'mealsImg'], '' + product['idx']), (o) => '' + o.file_idx);
                console.log({ productFileIdxs });
                fileIdxs = fileIdx.split(',');
                console.log({ fileIdxs });
                const delFileIdxs = productFileIdxs.filter((o) => !fileIdxs.includes(o));
                console.log({ delFileIdxs });
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
            console.log('-----------------------새 첨부파일 등록-----------------------');
            console.log({ files });
            new_file = await this.fileService.fileInfoInsert(files, product['idx']);
            console.log({ new_file });
            fileIdxs = (0, lodash_1.union)(fileIdxs, ...(0, lodash_1.map)(new_file[product['idx']], (obj) => (0, lodash_1.map)(obj, (o) => '' + o.file_idx)));
            console.log({ fileIdxs });
        }
        let file_info;
        console.log('-----------------------파일 정보 가져오기-----------------------');
        console.log({ fileIdxs });
        if (fileIdxs.length > 0) {
            file_info = await this.fileService.findIndexs(fileIdxs);
            console.log({ file_info });
        }
        return { product, file_info };
    }
    async productCreateCode() {
        const code = common_utils_1.commonUtils.generateRandomString(8).toUpperCase() +
            '-' +
            common_utils_1.commonUtils.generateRandomNumber(4);
        const isCode = await this.productRepository.findOne({
            where: { code: code },
        });
        if (isCode) {
            this.productCreateCode();
        }
        else {
            return code;
        }
    }
    async findAll(options, search, order) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', [registrationStatus]);
        if ((0, lodash_1.get)(where, 'product_info', '')) {
            const product_info = (0, lodash_1.sortBy)((0, lodash_1.map)((0, lodash_1.get)(where, 'product_info'), (o) => +o));
            where['product_info'] = product_info.join('%');
        }
        const alias = 'product';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.productOption', 'product_option')
            .leftJoinAndSelect('product.productInfo', 'product_info')
            .leftJoinAndSelect('product.metro', 'metro')
            .leftJoinAndSelect('product.college', 'college')
            .where((qb) => {
            qb.where('`product`.status IN (:status)', {
                status: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'status'))
                    ? (0, lodash_1.get)(where, 'status')
                    : [(0, lodash_1.get)(where, 'status')],
            });
            (0, lodash_1.get)(where, 'membership', '') &&
                qb.andWhere('`product`.`membership` = :membership', {
                    membership: (0, lodash_1.get)(where, 'membership'),
                });
            (0, lodash_1.get)(where, 'user_idx', '') &&
                qb.andWhere('`product`.`userIdx` = :user_idx', {
                    user_idx: (0, lodash_1.get)(where, 'user_idx'),
                });
            (0, lodash_1.get)(where, 'stayStatus', '') &&
                qb.andWhere('`product_option`.`stayStatus` = :stayStatus', {
                    stayStatus: (0, lodash_1.get)(where, 'stayStatus'),
                });
            (0, lodash_1.get)(where, 'min_priceMonth', '') &&
                qb.andWhere('`product_option`.`priceMonth` >= :min_priceMonth', {
                    min_priceMonth: +(0, lodash_1.get)(where, 'min_priceMonth'),
                });
            (0, lodash_1.get)(where, 'max_priceMonth', '') &&
                qb.andWhere('`product_option`.`priceMonth` <= :max_priceMonth', {
                    max_priceMonth: +(0, lodash_1.get)(where, 'max_priceMonth'),
                });
            (0, lodash_1.get)(where, 'product_info', '') &&
                qb.andWhere('`product`.productInfoIdxs LIKE :product_info', {
                    product_info: '%' + (0, lodash_1.get)(where, 'product_info') + '%',
                });
            if ((0, lodash_1.get)(where, 'keyword', '')) {
                qb.andWhere('(' +
                    '`product`.`title` LIKE :keyword' +
                    ' OR `product`.`titleEng` LIKE :keyword' +
                    ' OR `product`.`titleJpn` LIKE :keyword' +
                    ' OR `product`.`titleChn` LIKE :keyword' +
                    ' OR `product`.`addr1` LIKE :keyword' +
                    ' OR `product`.`addr2` LIKE :keyword' +
                    ' OR `product`.`addr1Eng` LIKE :keyword' +
                    ' OR `product`.`addr2Eng` LIKE :keyword' +
                    ' OR `product`.`addr1Jpn` LIKE :keyword' +
                    ' OR `product`.`addr2Jpn` LIKE :keyword' +
                    ' OR `product`.`addr1Chn` LIKE :keyword' +
                    ' OR `product`.`addr2Chn` LIKE :keyword' +
                    ' OR `metro`.`stationKor` LIKE :keyword' +
                    ' OR `college`.`nameKor` LIKE :keyword' +
                    ' OR `metro`.`stationEng` LIKE :keyword' +
                    ' OR `college`.`nameEng` LIKE :keyword' +
                    ' OR `metro`.`stationJpn` LIKE :keyword' +
                    ' OR `college`.`nameJpn` LIKE :keyword' +
                    ' OR `metro`.`stationChn` LIKE :keyword' +
                    ' OR `college`.`nameChn` LIKE :keyword' +
                    ')', {
                    keyword: '%' + (0, lodash_1.get)(where, 'keyword') + '%',
                });
            }
        })
            .orderBy(order_by)
            .skip(take * (page - 1) || 0)
            .take(take || 10)
            .getManyAndCount();
        const product_idxs = (0, lodash_1.map)(results, (o) => o.idx);
        let file_info = await this.getFileInfo(product_idxs);
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data, file_info };
    }
    async adminFindAll(options, search, order) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', [
            unregisteredStatus,
            notUsedStatus,
            registrationStatus,
        ]);
        const alias = 'product';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.productOption', 'product_option')
            .leftJoinAndSelect('product.productInfo', 'product_info')
            .leftJoinAndSelect('product.user', 'user')
            .leftJoinAndSelect('product.metro', 'metro')
            .leftJoinAndSelect('product.college', 'college')
            .where((qb) => {
            qb.where('`product`.status IN (:status)', {
                status: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'status'))
                    ? (0, lodash_1.get)(where, 'status')
                    : [(0, lodash_1.get)(where, 'status')],
            });
            (0, lodash_1.get)(where, 'membership', '') &&
                qb.andWhere('`product`.`membership` = :membership', {
                    membership: (0, lodash_1.get)(where, 'membership'),
                });
            (0, lodash_1.get)(where, 'title', '') &&
                qb.andWhere('`product`.title LIKE :title', {
                    title: '%' + (0, lodash_1.get)(where, 'title') + '%',
                });
            (0, lodash_1.get)(where, 'type', '') &&
                qb.andWhere('`product`.type IN (:type)', {
                    type: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'type'))
                        ? (0, lodash_1.get)(where, 'type')
                        : [(0, lodash_1.get)(where, 'type')],
                });
            (0, lodash_1.get)(where, 'name', '') &&
                qb.andWhere('`user`.name LIKE :name', {
                    name: '%' + (0, lodash_1.get)(where, 'name') + '%',
                });
            (0, lodash_1.get)(where, 'id', '') &&
                qb.andWhere('`user`.id LIKE :id', {
                    id: '%' + (0, lodash_1.get)(where, 'id') + '%',
                });
            if ((0, lodash_1.get)(where, 'keyword', '')) {
                qb.andWhere('(' +
                    '`product`.`title` LIKE :keyword' +
                    ' OR `product`.`addr1` LIKE :keyword' +
                    ' OR `product`.`addr2` LIKE :keyword' +
                    ' OR `metro`.`stationKor` LIKE :keyword' +
                    ' OR `college`.`nameKor` LIKE :keyword' +
                    ' OR `metro`.`stationEng` LIKE :keyword' +
                    ' OR `college`.`nameEng` LIKE :keyword' +
                    ' OR `metro`.`stationJpn` LIKE :keyword' +
                    ' OR `college`.`nameJpn` LIKE :keyword' +
                    ' OR `metro`.`stationChn` LIKE :keyword' +
                    ' OR `college`.`nameChn` LIKE :keyword' +
                    ')', {
                    keyword: '%' + (0, lodash_1.get)(where, 'keyword') + '%',
                });
            }
        })
            .orderBy(order_by)
            .skip(take * (page - 1) || 0)
            .take(take || 10)
            .getManyAndCount();
        const product_idxs = (0, lodash_1.map)(results, (o) => o.idx);
        let file_info = await this.getFileInfo(product_idxs);
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data, file_info };
    }
    async findIdxAll(idx) {
        const product = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.productOption', 'product_option')
            .leftJoinAndSelect('product.productInfo', 'product_info')
            .where((qb) => {
            qb.andWhere('`product`.idx IN (:idx)', { idx: idx });
        })
            .getMany();
        return product;
    }
    async findAllUser(userIdx) {
        const products = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.productOption', 'product_option')
            .leftJoinAndSelect('product.productInfo', 'product_info')
            .leftJoinAndSelect('product.user', 'user')
            .where((qb) => {
            qb.andWhere('`user`.idx = :userIdx', { userIdx: userIdx });
        })
            .getMany();
        return products;
    }
    async findOne(idx) {
        const product = await this.findOneIdx(idx);
        product['userIdx'] = (0, lodash_1.get)(product, ['user', 'idx'], 0);
        delete product.user;
        let file_info = await this.getFileInfo([idx]);
        return { product, file_info };
    }
    async adminFindOne(idx) {
        const product = await this.findOneIdx(idx);
        let file_info = await this.getFileInfo([idx]);
        return { product, file_info };
    }
    async getFileInfo(idxs) {
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['lodgingDetailImg', 'mealsImg'], idxs);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('숙소 상세 이미지 파일 없음');
        }
        return file_info;
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new exceptions_1.NotFoundException('product.service.findOneIdx: 잘못된 정보 입니다.');
        }
        const product = await this.productRepository.findOne({
            where: { idx: idx },
            relations: ['productInfo', 'user', 'metro', 'college'],
        });
        if (!(0, lodash_1.get)(product, 'idx', '')) {
            throw new exceptions_1.NotFoundException('product.service.findOneIdx: 정보를 찾을 수 없습니다.');
        }
        return product;
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    async updateAverageStar(idx, { star, reviewCount }) {
        await this.productRepository
            .createQueryBuilder()
            .update(product_entity_1.ProductEntity)
            .set({ star, reviewCount })
            .where(' idx = :idx', { idx: idx })
            .execute();
    }
    async updateMembership(userIdx, membershipStatus) {
        const products = await this.findAllUser(userIdx);
        const productIdxs = (0, lodash_1.map)(products, (o) => o['idx']);
        await this.productRepository
            .createQueryBuilder()
            .update(product_entity_1.ProductEntity)
            .set({ membership: membershipStatus })
            .where(' idx IN (:idx)', { idx: productIdxs })
            .execute();
    }
    async hostRemove(userInfo, idx) {
        if (!common_utils_1.commonUtils.isAdmin(userInfo.group)) {
            const user = await this.userService.findId(userInfo.id);
            const product = await this.findOneIdx(idx);
            if (user.idx != product.user.idx) {
                throw new exceptions_1.NotAcceptableException('product.service.hostRemove: 삭제 권한이 없습니다.');
            }
        }
        await this.remove(idx);
    }
    async remove(idx) {
        await this.productRepository
            .createQueryBuilder()
            .update(product_entity_1.ProductEntity)
            .set({ status: deleteStatus })
            .where(' idx = :idx', { idx: idx })
            .execute();
    }
    async dashboard() {
        const product = await this.productRepository
            .createQueryBuilder()
            .select('SUM(IF(`membership` IN (1) AND `status` = 2, 1, 0))', 'total_cnt')
            .execute();
        return product;
    }
    async createExcel(options, search, order) {
        const { data } = await this.adminFindAll(options, search, order);
        if (!data) {
            throw new exceptions_1.NotFoundException('product.service.excel: 다운로드할 데이터가 없습니다.');
        }
        return this.excelService.createExcel(data, {
            type: 'product',
        });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_service_1.FileService,
        product_info_service_1.ProductInfoService,
        users_service_1.UsersService,
        metro_service_1.MetroService,
        college_service_1.CollegeService,
        excel_service_1.ExcelService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map