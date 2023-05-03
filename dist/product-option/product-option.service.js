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
const excel_service_1 = require("../excel/excel.service");
const users_service_1 = require("../users/users.service");
const schedule_1 = require("@nestjs/schedule");
const moment = require("moment");
const config_service_1 = require("../config/config.service");
const settings_service_1 = require("../settings/settings.service");
const deleteStatus = -1;
const registrationStatus = '2';
let ProductOptionService = class ProductOptionService {
    constructor(productOptionRepository, productService, fileService, userService, productInfoService, excelService, settingsService) {
        this.productOptionRepository = productOptionRepository;
        this.productService = productService;
        this.fileService = fileService;
        this.userService = userService;
        this.productInfoService = productInfoService;
        this.excelService = excelService;
        this.settingsService = settingsService;
    }
    async create(createProductOptionDto, files) {
        let product;
        if ((0, lodash_1.get)(createProductOptionDto, 'productIdx', '')) {
            const productIdx = (0, lodash_1.get)(createProductOptionDto, 'productIdx');
            product = await this.productService.findOneIdx(+productIdx);
        }
        let productInfo;
        if ((0, lodash_1.get)(createProductOptionDto, 'productInfoIdx', '')) {
            const productInfoIdx = (0, lodash_1.get)(createProductOptionDto, 'productInfoIdx').split(',');
            productInfo = await this.productInfoService.findAllIdxs(productInfoIdx);
        }
        const product_option_data = {
            order: '10',
            code: await this.productOptionCreateCode(),
            product: product,
            productInfo: productInfo,
        };
        const dollor_exchange_rate = await this.settingsService.findOne('dollor_exchange_rate');
        if ((0, lodash_1.get)(createProductOptionDto, 'status', 0))
            product_option_data['status'] = +(0, lodash_1.get)(createProductOptionDto, 'status');
        if ((0, lodash_1.get)(createProductOptionDto, 'type', ''))
            product_option_data['type'] = (0, lodash_1.get)(createProductOptionDto, 'type');
        if ((0, lodash_1.get)(createProductOptionDto, 'stayStatus', ''))
            product_option_data['stayStatus'] = (0, lodash_1.get)(createProductOptionDto, 'stayStatus');
        if ((0, lodash_1.get)(createProductOptionDto, 'visitStatus', ''))
            product_option_data['visitStatus'] = (0, lodash_1.get)(createProductOptionDto, 'visitStatus');
        if ((0, lodash_1.get)(createProductOptionDto, 'paymentStatus', ''))
            product_option_data['paymentStatus'] = (0, lodash_1.get)(createProductOptionDto, 'paymentStatus');
        if ((0, lodash_1.get)(createProductOptionDto, 'title', ''))
            product_option_data['title'] = (0, lodash_1.get)(createProductOptionDto, 'title');
        if ((0, lodash_1.get)(createProductOptionDto, 'titleEng', ''))
            product_option_data['titleEng'] = (0, lodash_1.get)(createProductOptionDto, 'titleEng');
        if ((0, lodash_1.get)(createProductOptionDto, 'titleJpn', ''))
            product_option_data['titleJpn'] = (0, lodash_1.get)(createProductOptionDto, 'titleJpn');
        if ((0, lodash_1.get)(createProductOptionDto, 'titleChn', ''))
            product_option_data['titleChn'] = (0, lodash_1.get)(createProductOptionDto, 'titleChn');
        if ((0, lodash_1.get)(createProductOptionDto, 'price', '')) {
            product_option_data['price'] = +(0, lodash_1.get)(createProductOptionDto, 'price');
            product_option_data['priceEng'] = common_utils_1.commonUtils.calcExchangeRate(product_option_data['price'], +dollor_exchange_rate.set_value);
        }
        if ((0, lodash_1.get)(createProductOptionDto, 'priceMonth', '')) {
            product_option_data['priceMonth'] = +(0, lodash_1.get)(createProductOptionDto, 'priceMonth');
            product_option_data['priceMonthEng'] = common_utils_1.commonUtils.calcExchangeRate(product_option_data['priceMonth'], +dollor_exchange_rate.set_value);
        }
        if ((0, lodash_1.get)(createProductOptionDto, 'priceWeek', '')) {
            product_option_data['priceWeek'] = +(0, lodash_1.get)(createProductOptionDto, 'priceWeek');
            product_option_data['priceWeekEng'] = common_utils_1.commonUtils.calcExchangeRate(product_option_data['priceWeek'], +dollor_exchange_rate.set_value);
        }
        if ((0, lodash_1.get)(createProductOptionDto, 'priceDay', '')) {
            product_option_data['priceDay'] = +(0, lodash_1.get)(createProductOptionDto, 'priceDay');
            product_option_data['priceDayEng'] = common_utils_1.commonUtils.calcExchangeRate(product_option_data['priceDay'], +dollor_exchange_rate.set_value);
        }
        if ((0, lodash_1.get)(createProductOptionDto, 'detailsKor', ''))
            product_option_data['detailsKor'] = (0, lodash_1.get)(createProductOptionDto, 'detailsKor');
        if ((0, lodash_1.get)(createProductOptionDto, 'detailsEng', ''))
            product_option_data['detailsEng'] = (0, lodash_1.get)(createProductOptionDto, 'detailsEng');
        if ((0, lodash_1.get)(createProductOptionDto, 'detailsJpn', ''))
            product_option_data['detailsJpn'] = (0, lodash_1.get)(createProductOptionDto, 'detailsJpn');
        if ((0, lodash_1.get)(createProductOptionDto, 'detailsChn', ''))
            product_option_data['detailsChn'] = (0, lodash_1.get)(createProductOptionDto, 'detailsChn');
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
                const productOptionFileIdxs = (0, lodash_1.map)(await this.fileService.findCategory(['roomDetailImg'], '' + productOption['idx']), (o) => '' + o.file_idx);
                fileIdxs = fileIdx.split(',');
                const delFileIdxs = productOptionFileIdxs.filter((o) => !fileIdxs.includes(o));
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
            fileIdxs = (0, lodash_1.union)(fileIdxs, ...(0, lodash_1.map)(new_file[product_option_data['idx']], (obj) => (0, lodash_1.map)(obj, (o) => '' + o.file_idx)));
        }
        let file_info;
        if (fileIdxs.length > 0) {
            file_info = await this.fileService.findIndexs(fileIdxs);
        }
        return { productOption, file_info };
    }
    async productOptionCreateCode() {
        const code = common_utils_1.commonUtils.generateRandomString(8).toUpperCase() +
            '-' +
            common_utils_1.commonUtils.generateRandomNumber(4);
        const isCode = await this.productOptionRepository.findOne({
            where: { code: code },
        });
        if (isCode) {
            this.productOptionCreateCode();
        }
        else {
            return code;
        }
    }
    async findAll(options, search, order) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', [registrationStatus]);
        const alias = 'product_option';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.productOptionRepository
            .createQueryBuilder('product_option')
            .leftJoinAndSelect('product_option.product', 'product')
            .leftJoinAndSelect('product.user', 'user')
            .leftJoinAndSelect('product_option.productInfo', 'productInfo')
            .leftJoinAndSelect('product_info_product_product', 'product_info_to_product', '`product`.idx = `product_info_to_product`.productIdx')
            .leftJoinAndSelect('product_info', 'product_info', '`product_info`.idx = `product_info_to_product`.productInfoIdx')
            .where((qb) => {
            qb.where('`product_option`.status IN (:status)', { status: (0, lodash_1.isArray)(where['status']) ? where['status'] : [where['status']] });
            qb.andWhere('`product`.status IN (:status)', { status: (0, lodash_1.isArray)(where['status']) ? where['status'] : [where['status']] });
            (0, lodash_1.get)(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: (0, lodash_1.get)(where, 'title') });
            (0, lodash_1.get)(where, 'type', '') && qb.andWhere('`product`.`type` IN (:type)', { type: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'type')) ? (0, lodash_1.get)(where, 'type') : [(0, lodash_1.get)(where, 'type')] });
            (0, lodash_1.get)(where, 'product_idx', '') && qb.andWhere('`product_option`.`productIdx` = :product_idx', { product_idx: (0, lodash_1.get)(where, 'product_idx') });
            (0, lodash_1.get)(where, 'po_title', '') && qb.andWhere('`product_option`.`title` LIKE :po_title', { po_title: '%' + (0, lodash_1.get)(where, 'po_title') + '%' });
            (0, lodash_1.get)(where, 'name', '') && qb.andWhere('`user`.`name` LIKE :name', { name: '%' + (0, lodash_1.get)(where, 'name') + '%' });
            (0, lodash_1.get)(where, 'id', '') && qb.andWhere('`user`.`id` LIKE :id', { id: '%' + (0, lodash_1.get)(where, 'id') + '%' });
            (0, lodash_1.get)(where, 'title', '') && qb.andWhere('`product`.`title` LIKE :title', { title: '%' + (0, lodash_1.get)(where, 'title') + '%' });
            (0, lodash_1.get)(where, 'addr1', '') && qb.andWhere('`product`.`addr1` LIKE :addr1', { addr1: '%' + (0, lodash_1.get)(where, 'addr1') + '%' });
            (0, lodash_1.get)(where, 'addr2', '') && qb.andWhere('`product`.`addr2` LIKE :addr2', { addr2: '%' + (0, lodash_1.get)(where, 'addr2') + '%' });
            (0, lodash_1.get)(where, 'metro', '') && qb.andWhere('`product`.`metro` LIKE :metro', { metro: '%' + (0, lodash_1.get)(where, 'metro') + '%' });
            (0, lodash_1.get)(where, 'college', '') && qb.andWhere('`product`.`college` LIKE :college', { college: '%' + (0, lodash_1.get)(where, 'college') + '%' });
        })
            .orderBy(order_by)
            .skip(take * (page - 1) || 0)
            .take(take || 10)
            .getManyAndCount();
        const product_option_idxs = (0, lodash_1.map)(results, (o) => o.idx);
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['roomDetailImg'], product_option_idxs);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('방 리스트 이미지 파일 없음');
        }
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data, file_info };
    }
    async findOne(idx) {
        const productOption = await this.findIdx(idx);
        let file_info = {};
        try {
            file_info = await this.fileService.findCategoryForeignAll(['roomDetailImg'], [idx]);
            file_info = common_utils_1.commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
        }
        catch (error) {
            console.log('방 상세 이미지 파일 없음');
        }
        return { productOption, file_info };
    }
    async findIdx(idx) {
        if (!idx) {
            throw new exceptions_1.NotFoundException('잘못된 정보 입니다.');
        }
        const productOption = await this.productOptionRepository.findOne({
            where: { idx: idx },
            relations: [
                'product',
                'product.productInfo',
                'productInfo',
                'product.user',
                'product.user.device',
            ],
        });
        if (!(0, lodash_1.get)(productOption, 'idx')) {
            throw new exceptions_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return productOption;
    }
    update(id, updateProductOptionDto) {
        return `This action updates a #${id} productOption`;
    }
    async hostRemove(userInfo, idx) {
        if (!common_utils_1.commonUtils.isAdmin(userInfo.group)) {
            const user = await this.userService.findId(userInfo.id);
            const po = await this.findIdx(idx);
            if (user.idx != po.product.user.idx) {
                throw new common_1.NotAcceptableException('product-option.service.hostRemove: 삭제 권한이 없습니다.');
            }
        }
        await this.remove(idx);
    }
    async remove(idx) {
        await this.productOptionRepository
            .createQueryBuilder()
            .update(product_option_entity_1.ProductOptionEntity)
            .set({ status: deleteStatus })
            .where(' idx = :idx', { idx: idx })
            .execute();
    }
    async createExcel(options, search, order) {
        const { data } = await this.findAll(options, search, order);
        if (!data) {
            throw new exceptions_1.NotFoundException('product-option.service.excel: 다운로드할 데이터가 없습니다.');
        }
        return this.excelService.createExcel(data, {
            type: 'product_option',
        });
    }
    async koreaEximApi() {
        console.log('[cron] koreaEximApi: ', moment().format('YYYY-MM-DD HH:mm:ss'));
        const configService = new config_service_1.ConfigService(process.env);
        const koreaeximConfig = configService.getKoreaeximConfig();
        const yesterday = moment().add(-1, 'day').format('YYYYMMDD');
        const url = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON'
            + '?authkey=' + koreaeximConfig.koreaexim
            + '&data=AP01'
            + '&searchdate=' + yesterday;
        const response = await common_utils_1.commonUtils.getResponse(url, {});
        const { data } = response;
        const usd_idx = (0, lodash_1.findIndex)(data, function (o) { return o['cur_unit'] == 'USD'; });
        const dollor_exchange_rate = common_utils_1.commonUtils.stringNumberToInt((0, lodash_1.get)(data, [usd_idx, 'bkpr'], '0'));
        if (dollor_exchange_rate > 0) {
            await this.settingsService.insert({ dollor_exchange_rate: dollor_exchange_rate });
            const po = await this.productOptionRepository.find();
            console.log(po.length);
            if (po.length > 0) {
                for (const key in po) {
                    const priceEng = common_utils_1.commonUtils.calcExchangeRate(po[key].price, dollor_exchange_rate);
                    const priceMonthEng = common_utils_1.commonUtils.calcExchangeRate(po[key].priceMonth, dollor_exchange_rate);
                    const priceWeekEng = common_utils_1.commonUtils.calcExchangeRate(po[key].priceWeek, dollor_exchange_rate);
                    await this.productOptionRepository.update(po[key].idx, { priceEng, priceMonthEng, priceWeekEng });
                }
            }
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 1 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductOptionService.prototype, "koreaEximApi", null);
ProductOptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_option_entity_1.ProductOptionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_service_1.ProductService,
        file_service_1.FileService,
        users_service_1.UsersService,
        product_info_service_1.ProductInfoService,
        excel_service_1.ExcelService,
        settings_service_1.SettingsService])
], ProductOptionService);
exports.ProductOptionService = ProductOptionService;
//# sourceMappingURL=product-option.service.js.map