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
exports.OrderTotalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const order_total_entity_1 = require("./entities/order-total.entity");
let OrderTotalService = class OrderTotalService {
    constructor(orderTotalRepository) {
        this.orderTotalRepository = orderTotalRepository;
    }
    create(createOrderTotalDto) {
        return 'This action adds a new orderTotal';
    }
    async orderTotalCreate(order, orderProduct) {
        let orderTotalInfo;
        try {
            orderTotalInfo = await this.findOneOrderIdx(order['idx']);
        }
        catch (error) {
            orderTotalInfo = {};
        }
        const num = (0, lodash_1.get)(orderProduct, ['num']) > 0 ? orderProduct['num'] : 1;
        orderTotalInfo['orderIdx'] = '' + order['idx'];
        orderTotalInfo['totalPrice'] = orderProduct['payPrice'] * num;
        orderTotalInfo['payPrice'] = orderProduct['payPrice'] * num;
        orderTotalInfo['origPayPrice'] = orderProduct['payPrice'] * num;
        orderTotalInfo['totalPriceEng'] = orderProduct['payPriceEng'] * num;
        orderTotalInfo['payPriceEng'] = orderProduct['payPriceEng'] * num;
        orderTotalInfo['origPayPriceEng'] = orderProduct['payPriceEng'] * num;
        const orderTotalEntity = await this.orderTotalRepository.create(orderTotalInfo);
        const orderTotal = await this.orderTotalRepository.save(orderTotalEntity);
        return orderTotal;
    }
    async priceChange(orderIdx, cancelPrice, cancelPriceEng) {
        const total = await this.orderTotalRepository.findOne({
            where: { orderIdx: orderIdx }
        });
        total['totalPrice'] = +total['totalPrice'] - cancelPrice;
        total['totalCancelPrice'] = +total['totalCancelPrice'] + cancelPrice;
        total['payPrice'] = +total['payPrice'] - cancelPrice;
        total['totalPriceEng'] = +total['totalPriceEng'] - cancelPriceEng;
        total['totalCancelPriceEng'] = +total['totalCancelPriceEng'] + cancelPriceEng;
        total['payPriceEng'] = +total['payPriceEng'] - cancelPriceEng;
        await this.orderTotalRepository.createQueryBuilder()
            .update(order_total_entity_1.OrderTotalEntity)
            .set(total)
            .where("idx = :idx", { idx: total['idx'] })
            .execute();
    }
    findAll() {
        return `This action returns all orderTotal`;
    }
    findOne(id) {
        return `This action returns a #${id} orderTotal`;
    }
    async findOneOrderIdx(orderIdx) {
        if (!orderIdx) {
            throw new common_1.NotFoundException('주문 번호 정보가 없습니다.');
        }
        const orderTotal = await this.orderTotalRepository.findOne({
            where: { orderIdx: orderIdx }
        });
        if (!(0, lodash_1.get)(orderTotal, 'idx', '')) {
            throw new common_1.NotFoundException('조회된 정보가 없습니다.');
        }
        return orderTotal;
    }
    update(id, updateOrderTotalDto) {
        return `This action updates a #${id} orderTotal`;
    }
    remove(id) {
        return `This action removes a #${id} orderTotal`;
    }
    async dashboard(month) {
        const orderTotal_cnt = await this.orderTotalRepository.createQueryBuilder('orderTotal')
            .select('SUM(orderTotal.`payPrice`)', 'total_pay_price')
            .leftJoin('order', 'order', '`orderTotal`.orderIdx = `order`.`idx`')
            .where(qb => {
            qb.where('DATE_FORMAT(orderTotal.`createdAt`, "%Y-%m") = :month', { month: month });
            qb.andWhere('order.status IN (:status)', { status: [2, 3, 4, 6] });
        })
            .execute();
        return orderTotal_cnt;
    }
};
OrderTotalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_total_entity_1.OrderTotalEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderTotalService);
exports.OrderTotalService = OrderTotalService;
//# sourceMappingURL=order-total.service.js.map