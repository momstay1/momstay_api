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
exports.OrderProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const file_service_1 = require("../file/file.service");
const typeorm_2 = require("typeorm");
const order_product_entity_1 = require("./entities/order-product.entity");
const settings_service_1 = require("../settings/settings.service");
const moment = require("moment");
let OrderProductService = class OrderProductService {
    constructor(orderProductRepository, fileService, settingsService) {
        this.orderProductRepository = orderProductRepository;
        this.fileService = fileService;
        this.settingsService = settingsService;
    }
    create(createOrderProductDto) {
        return 'This action adds a new orderProduct';
    }
    async createOrderProduct(order, po, createOrderDto) {
        const file = await this.fileService.findCategoryForeignAll(['roomDetailImg'], [po['idx']]);
        let op = {};
        if ((0, lodash_1.get)(createOrderDto, 'orderProductIdx', '')) {
            op = await this.findOneIdx(createOrderDto['orderProductIdx']);
        }
        let priceInfo = {};
        if ((0, lodash_1.get)(createOrderDto, 'startAt', '') && (0, lodash_1.get)(createOrderDto, 'endAt', '')) {
            const dollor_exchange_rate = await this.settingsService.findOne('dollor_exchange_rate');
            priceInfo = {
                price: await this.calcTotalPrice((0, lodash_1.get)(po, 'priceMonth', 0), (0, lodash_1.get)(createOrderDto, 'startAt'), (0, lodash_1.get)(createOrderDto, 'endAt')),
                tax: common_utils_1.commonUtils.getStatus('tax'),
                fee: common_utils_1.commonUtils.getStatus('fee'),
            };
            priceInfo['taxPrice'] = common_utils_1.commonUtils.calcTax(priceInfo['price'], priceInfo['tax'] + '%');
            priceInfo['feePrice'] = common_utils_1.commonUtils.calcTax(priceInfo['price'] + priceInfo['taxPrice'], priceInfo['fee'] + '%');
            priceInfo['totalPrice'] = priceInfo['price'] + priceInfo['taxPrice'] + priceInfo['feePrice'];
            if (+(0, lodash_1.get)(dollor_exchange_rate, 'set_value', 0) > 0) {
                priceInfo['priceEng'] = common_utils_1.commonUtils.calcExchangeRate(priceInfo['price'], +dollor_exchange_rate.set_value);
                priceInfo['taxPriceEng'] = common_utils_1.commonUtils.calcExchangeRate(priceInfo['taxPrice'], +dollor_exchange_rate.set_value);
                priceInfo['feePriceEng'] = common_utils_1.commonUtils.calcExchangeRate(priceInfo['feePrice'], +dollor_exchange_rate.set_value);
                priceInfo['totalPriceEng'] = Math.floor((priceInfo['priceEng'] + priceInfo['taxPriceEng'] + priceInfo['feePriceEng']) * 100) / 100;
            }
        }
        console.log({ priceInfo });
        op['status'] = order['status'];
        op['eq'] = '001';
        op['code'] = order['code'] + '-001';
        op['productOptionCode'] = po['product']['code'];
        op['productType'] = '1';
        op['parcelCode'] = order['code'] + '-P01';
        op['title'] = po['title'];
        op['options'] = po['code'];
        op['num'] = (0, lodash_1.get)(createOrderDto, 'num', 1);
        op['taxPrice'] = (0, lodash_1.get)(priceInfo, ['taxPrice'], 0);
        op['feePrice'] = (0, lodash_1.get)(priceInfo, ['feePrice'], 0);
        op['price'] = (0, lodash_1.get)(priceInfo, ['price'], 0);
        op['payPrice'] = (0, lodash_1.get)(priceInfo, ['totalPrice'], 0);
        op['taxPriceEng'] = (0, lodash_1.get)(priceInfo, ['taxPriceEng'], 0);
        op['feePriceEng'] = (0, lodash_1.get)(priceInfo, ['feePriceEng'], 0);
        op['priceEng'] = (0, lodash_1.get)(priceInfo, ['priceEng'], 0);
        op['payPriceEng'] = (0, lodash_1.get)(priceInfo, ['totalPriceEng'], 0);
        op['img'] = file[0]['file_storage_path'];
        op['user'] = (0, lodash_1.get)(order, 'user', null);
        op['order'] = order;
        op['productOption'] = po;
        if ((0, lodash_1.get)(createOrderDto, 'startAt', ''))
            op['startAt'] = (0, lodash_1.get)(createOrderDto, 'startAt');
        if ((0, lodash_1.get)(createOrderDto, 'endAt', ''))
            op['endAt'] = (0, lodash_1.get)(createOrderDto, 'endAt');
        if ((0, lodash_1.get)(createOrderDto, 'memo', ''))
            op['memo'] = (0, lodash_1.get)(createOrderDto, 'memo');
        const orderProductEntity = await this.orderProductRepository.create(op);
        const orderProduct = await this.orderProductRepository.save(orderProductEntity);
        return { orderProduct, priceInfo };
    }
    findAll() {
        return `This action returns all orderProduct`;
    }
    findOne(id) {
        return `This action returns a #${id} orderProduct`;
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const orderProduct = await this.orderProductRepository.findOne({
            where: { idx: idx }
        });
        if (!(0, lodash_1.get)(orderProduct, 'idx', '')) {
            throw new common_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return orderProduct;
    }
    update(id, updateOrderProductDto) {
        return `This action updates a #${id} orderProduct`;
    }
    async statusChange(orderIdx, status, cancelReason) {
        const set = { status: status };
        if (cancelReason) {
            set['cancelReason'] = cancelReason;
        }
        await this.orderProductRepository.createQueryBuilder()
            .update(order_product_entity_1.OrderProductEntity)
            .set(set)
            .where("`orderIdx` = :orderIdx", { orderIdx: orderIdx })
            .execute();
    }
    async cancelPrice(orderIdx, cancelPrice, cancelPriceEng) {
        await this.orderProductRepository.createQueryBuilder()
            .update(order_product_entity_1.OrderProductEntity)
            .set({
            price: 0,
            taxPrice: 0,
            feePrice: 0,
            payPrice: 0,
            priceEng: 0,
            taxPriceEng: 0,
            feePriceEng: 0,
            payPriceEng: 0,
            cancelPrice: cancelPrice,
            cancelPriceEng: cancelPriceEng,
        })
            .where("`orderIdx` = :orderIdx", { orderIdx: orderIdx })
            .execute();
    }
    remove(id) {
        return `This action removes a #${id} orderProduct`;
    }
    async calcTotalPrice(priceMonth, start, end) {
        const start_date = moment(start);
        const end_date = moment(end);
        const start_year = start_date.format('YYYY');
        const start_month = start_date.format('MM');
        let totalPrice = 0;
        let i = 0;
        let diff_days = end_date.diff(start_date, 'days') + 1;
        let start_day = start_date.format('DD');
        console.log('총 주거일:', diff_days);
        do {
            const end_day = +moment(start_year + '-' + start_month).add(i, 'month').endOf('month').format('DD');
            const priceDay = priceMonth > 0 ? +(priceMonth / end_day).toFixed() : priceMonth;
            const last_month = moment(start_year + '-' + start_month + '-' + end_day).add(i, 'month');
            const first_month = moment(start_year + '-' + start_month + '-' + start_day).add(i, 'month');
            const days = last_month.diff(first_month, 'day') + 1;
            if (diff_days >= days) {
                console.log('--------------주거 일: ', days);
                console.log('---------한달 일 가격: ', priceDay);
                totalPrice += (priceDay * days);
            }
            else {
                console.log('--------------주거 일: ', diff_days);
                console.log('---------한달 일 가격: ', priceDay);
                totalPrice += (priceDay * diff_days);
                break;
            }
            i++;
            diff_days = diff_days - days;
            start_day = moment(start_year + '-' + start_month).add(i).startOf('month').format('DD');
            if (!totalPrice || diff_days < 0) {
                throw new Error("계산 오류");
            }
        } while (diff_days > 0);
        return totalPrice;
    }
};
OrderProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_product_entity_1.OrderProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_service_1.FileService,
        settings_service_1.SettingsService])
], OrderProductService);
exports.OrderProductService = OrderProductService;
//# sourceMappingURL=order-product.service.js.map