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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const common_utils_1 = require("../common/common.utils");
const product_service_1 = require("../product/product.service");
const product_option_service_1 = require("../product-option/product-option.service");
const users_service_1 = require("../users/users.service");
const order_product_service_1 = require("../order-product/order-product.service");
const order_total_service_1 = require("../order-total/order-total.service");
const iamport_service_1 = require("../iamport/iamport.service");
const pg_data_service_1 = require("../pg-data/pg-data.service");
const moment = require("moment");
const paginate_1 = require("../paginate");
const push_notification_service_1 = require("../push-notification/push-notification.service");
let OrderService = class OrderService {
    constructor(orderRepository, productService, usersService, productOptionService, userService, orderProductService, ordertotalService, iamportService, pgDataService, pushNotiService) {
        this.orderRepository = orderRepository;
        this.productService = productService;
        this.usersService = usersService;
        this.productOptionService = productOptionService;
        this.userService = userService;
        this.orderProductService = orderProductService;
        this.ordertotalService = ordertotalService;
        this.iamportService = iamportService;
        this.pgDataService = pgDataService;
        this.pushNotiService = pushNotiService;
    }
    async create(userInfo, createOrderDto, req) {
        const ord_data = {};
        if ((0, lodash_1.get)(createOrderDto, 'status', ''))
            ord_data['status'] = (0, lodash_1.get)(createOrderDto, 'status');
        if ((0, lodash_1.get)(createOrderDto, 'imp_uid', ''))
            ord_data['imp_uid'] = (0, lodash_1.get)(createOrderDto, 'imp_uid');
        if ((0, lodash_1.get)(createOrderDto, 'billingKey', ''))
            ord_data['billingKey'] = (0, lodash_1.get)(createOrderDto, 'billingKey');
        if ((0, lodash_1.get)(createOrderDto, 'payment', ''))
            ord_data['payment'] = (0, lodash_1.get)(createOrderDto, 'payment');
        if ((0, lodash_1.get)(createOrderDto, 'clientName', ''))
            ord_data['clientName'] = (0, lodash_1.get)(createOrderDto, 'clientName');
        if ((0, lodash_1.get)(createOrderDto, 'clientEmail', ''))
            ord_data['clientEmail'] = (0, lodash_1.get)(createOrderDto, 'clientEmail');
        if ((0, lodash_1.get)(createOrderDto, 'clientPhone1', ''))
            ord_data['clientPhone1'] = (0, lodash_1.get)(createOrderDto, 'clientPhone1');
        if ((0, lodash_1.get)(createOrderDto, 'clientPhone2', ''))
            ord_data['clientPhone2'] = (0, lodash_1.get)(createOrderDto, 'clientPhone2');
        if ((0, lodash_1.get)(createOrderDto, 'inPostCode', ''))
            ord_data['inPostCode'] = (0, lodash_1.get)(createOrderDto, 'inPostCode');
        if ((0, lodash_1.get)(createOrderDto, 'inAddr1', ''))
            ord_data['inAddr1'] = (0, lodash_1.get)(createOrderDto, 'inAddr1');
        if ((0, lodash_1.get)(createOrderDto, 'inAddr2', ''))
            ord_data['inAddr2'] = (0, lodash_1.get)(createOrderDto, 'inAddr2');
        if ((0, lodash_1.get)(createOrderDto, 'shipName', ''))
            ord_data['shipName'] = (0, lodash_1.get)(createOrderDto, 'shipName');
        if ((0, lodash_1.get)(createOrderDto, 'shipPhone1', ''))
            ord_data['shipPhone1'] = (0, lodash_1.get)(createOrderDto, 'shipPhone1');
        if ((0, lodash_1.get)(createOrderDto, 'shipPhone2', ''))
            ord_data['shipPhone2'] = (0, lodash_1.get)(createOrderDto, 'shipPhone2');
        if ((0, lodash_1.get)(createOrderDto, 'shipArea', ''))
            ord_data['shipArea'] = (0, lodash_1.get)(createOrderDto, 'shipArea');
        if ((0, lodash_1.get)(createOrderDto, 'shipPostCode', ''))
            ord_data['shipPostCode'] = (0, lodash_1.get)(createOrderDto, 'shipPostCode');
        if ((0, lodash_1.get)(createOrderDto, 'shipNation', ''))
            ord_data['shipNation'] = (0, lodash_1.get)(createOrderDto, 'shipNation');
        if ((0, lodash_1.get)(createOrderDto, 'shipState', ''))
            ord_data['shipState'] = (0, lodash_1.get)(createOrderDto, 'shipState');
        if ((0, lodash_1.get)(createOrderDto, 'shipCity', ''))
            ord_data['shipCity'] = (0, lodash_1.get)(createOrderDto, 'shipCity');
        if ((0, lodash_1.get)(createOrderDto, 'shipAddr1', ''))
            ord_data['shipAddr1'] = (0, lodash_1.get)(createOrderDto, 'shipAddr1');
        if ((0, lodash_1.get)(createOrderDto, 'shipAddr2', ''))
            ord_data['shipAddr2'] = (0, lodash_1.get)(createOrderDto, 'shipAddr2');
        if ((0, lodash_1.get)(createOrderDto, 'bank', ''))
            ord_data['bank'] = (0, lodash_1.get)(createOrderDto, 'bank');
        if ((0, lodash_1.get)(createOrderDto, 'account', ''))
            ord_data['account'] = (0, lodash_1.get)(createOrderDto, 'account');
        if ((0, lodash_1.get)(createOrderDto, 'depositer', ''))
            ord_data['depositer'] = (0, lodash_1.get)(createOrderDto, 'depositer');
        if ((0, lodash_1.get)(createOrderDto, 'remitter', ''))
            ord_data['remitter'] = (0, lodash_1.get)(createOrderDto, 'remitter');
        if ((0, lodash_1.get)(createOrderDto, 'adminMemo', ''))
            ord_data['adminMemo'] = (0, lodash_1.get)(createOrderDto, 'adminMemo');
        if (!(0, lodash_1.get)(createOrderDto, 'idx', 0)) {
            ord_data['code'] = await this.ordCreateCode();
            ord_data['userAgent'] = req.get('user-agent');
            ord_data['pc_mobile'] = common_utils_1.commonUtils.isMobile(createOrderDto['userAgent']);
        }
        else {
            ord_data['idx'] = createOrderDto['idx'];
            const order = await this.orderRepository.findOne({ idx: ord_data['idx'] });
            if (order['status'] >= 1) {
                throw new common_1.BadRequestException('이미 처리된 주문입니다.');
            }
            if (createOrderDto['status'] == 2 && ('' + order['paiedAt']).split(' ')[0] == '0000-00-00') {
                if (!(0, lodash_1.get)(createOrderDto, 'imp_uid', '')) {
                    throw new common_1.NotFoundException('imp_uid 정보가 없습니다.');
                }
                const pg_data = await this.orderVerification(createOrderDto);
                await this.pgDataService.create(order['code'], pg_data);
                ord_data['paiedAt'] = moment(pg_data['paid_at']).format('YYYY-MM-DD HH:mm:ss');
            }
        }
        const po = await this.productOptionService.findIdx(+createOrderDto['productOptionIdx']);
        ord_data['user'] = await this.userService.findId((0, lodash_1.get)(userInfo, 'id'));
        const orderEntity = await this.orderRepository.create(ord_data);
        let order = await this.orderRepository.save(orderEntity);
        order = await this.findOneIdx(order['idx']);
        const { orderProduct, priceInfo } = await this.orderProductService.createOrderProduct(order, po, createOrderDto);
        await this.ordertotalService.orderTotalCreate(order, orderProduct);
        const { user } = (0, lodash_1.get)(po, ['product']);
        if ((0, lodash_1.get)(user, ['device', 'token'], '')) {
            await this.pushNotiService.guestOrderPush(user, po);
        }
        return { order, orderProduct, po, priceInfo };
    }
    async ordCreateCode() {
        const code = moment().format('YYMMDD') + common_utils_1.commonUtils.createCode().toUpperCase();
        const isCode = await this.orderRepository.findOne({
            where: { code: code }
        });
        if (isCode) {
            this.ordCreateCode();
        }
        else {
            return code;
        }
    }
    async guestFindAll(userInfo, options, search, order) {
        const { take, page } = options;
        const user = await this.usersService.findId(userInfo.id);
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', (0, lodash_1.values)(common_utils_1.commonUtils.getStatus(['order_status'])));
        const alias = 'order';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        console.log({ order_by });
        const [results, total] = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'guestUser')
            .leftJoinAndSelect('order.orderProduct', 'orderProduct')
            .leftJoinAndSelect('orderProduct.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('product.user', 'hostUser')
            .where(qb => {
            qb.where('`order`.status IN (:status)', { status: (0, lodash_1.isArray)(where['status']) ? where['status'] : [where['status']] });
            (0, lodash_1.get)(where, 'code', '')
                && qb.andWhere('`order`.code IN (:code)', { code: (0, lodash_1.isArray)(where['code']) ? where['code'] : [where['code']] });
            (0, lodash_1.get)(where, 'imp_uid', '')
                && qb.andWhere('`order`.imp_uid IN (:imp_uid)', { imp_uid: (0, lodash_1.isArray)(where['imp_uid']) ? where['imp_uid'] : [where['imp_uid']] });
            (0, lodash_1.get)(where, 'payment', '')
                && qb.andWhere('`order`.payment IN (:payment)', { payment: (0, lodash_1.isArray)(where['payment']) ? where['payment'] : [where['payment']] });
            (0, lodash_1.get)(where, 'clientName', '')
                && qb.andWhere('`order`.clientName IN (:clientName)', { clientName: (0, lodash_1.isArray)(where['clientName']) ? where['clientName'] : [where['clientName']] });
            (0, lodash_1.get)(where, 'bank', '')
                && qb.andWhere('`order`.bank IN (:bank)', { bank: (0, lodash_1.isArray)(where['bank']) ? where['bank'] : [where['bank']] });
            (0, lodash_1.get)(where, 'account', '')
                && qb.andWhere('`order`.account IN (:account)', { account: (0, lodash_1.isArray)(where['account']) ? where['account'] : [where['account']] });
            (0, lodash_1.get)(where, 'depositer', '')
                && qb.andWhere('`order`.depositer IN (:depositer)', { depositer: (0, lodash_1.isArray)(where['depositer']) ? where['depositer'] : [where['depositer']] });
            (0, lodash_1.get)(where, 'remitter', '')
                && qb.andWhere('`order`.remitter IN (:remitter)', { remitter: (0, lodash_1.isArray)(where['remitter']) ? where['remitter'] : [where['remitter']] });
            if (['host', 'guest'].includes(user['group']['id'])) {
                qb.andWhere('`guestUser`.idx = :userIdx', { userIdx: user['idx'] });
            }
        })
            .orderBy(order_by)
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data };
    }
    async hostFindAll(userInfo, options, search, order) {
        const { take, page } = options;
        const user = await this.usersService.findId(userInfo.id);
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', (0, lodash_1.values)(common_utils_1.commonUtils.getStatus(['order_status'])));
        const alias = 'order';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        console.log({ order_by });
        const [results, total] = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'guestUser')
            .leftJoinAndSelect('order.orderProduct', 'orderProduct')
            .leftJoinAndSelect('orderProduct.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('product.user', 'hostUser')
            .where(qb => {
            qb.where('`order`.status IN (:status)', { status: (0, lodash_1.isArray)(where['status']) ? where['status'] : [where['status']] });
            (0, lodash_1.get)(where, 'code', '')
                && qb.andWhere('`order`.code IN (:code)', { code: (0, lodash_1.isArray)(where['code']) ? where['code'] : [where['code']] });
            (0, lodash_1.get)(where, 'imp_uid', '')
                && qb.andWhere('`order`.imp_uid IN (:imp_uid)', { imp_uid: (0, lodash_1.isArray)(where['imp_uid']) ? where['imp_uid'] : [where['imp_uid']] });
            (0, lodash_1.get)(where, 'payment', '')
                && qb.andWhere('`order`.payment IN (:payment)', { payment: (0, lodash_1.isArray)(where['payment']) ? where['payment'] : [where['payment']] });
            (0, lodash_1.get)(where, 'clientName', '')
                && qb.andWhere('`order`.clientName IN (:clientName)', { clientName: (0, lodash_1.isArray)(where['clientName']) ? where['clientName'] : [where['clientName']] });
            (0, lodash_1.get)(where, 'bank', '')
                && qb.andWhere('`order`.bank IN (:bank)', { bank: (0, lodash_1.isArray)(where['bank']) ? where['bank'] : [where['bank']] });
            (0, lodash_1.get)(where, 'account', '')
                && qb.andWhere('`order`.account IN (:account)', { account: (0, lodash_1.isArray)(where['account']) ? where['account'] : [where['account']] });
            (0, lodash_1.get)(where, 'depositer', '')
                && qb.andWhere('`order`.depositer IN (:depositer)', { depositer: (0, lodash_1.isArray)(where['depositer']) ? where['depositer'] : [where['depositer']] });
            (0, lodash_1.get)(where, 'remitter', '')
                && qb.andWhere('`order`.remitter IN (:remitter)', { remitter: (0, lodash_1.isArray)(where['remitter']) ? where['remitter'] : [where['remitter']] });
            if (user['group']['id'] == 'host') {
                qb.andWhere('`hostUser`.idx = :userIdx', { userIdx: user['idx'] });
            }
        })
            .orderBy(order_by)
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data };
    }
    async findOneIdxByGuest(userInfo, idx) {
        if (!idx) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const user = await this.usersService.findId(userInfo['id']);
        const order = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'guestUser')
            .leftJoinAndSelect('order.orderProduct', 'orderProduct')
            .leftJoinAndSelect('orderProduct.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('product.user', 'hostUser')
            .where(qb => {
            qb.where('`order`.idx = :idx', { idx: idx });
            if (!['root', 'admin'].includes(user['group']['id'])) {
                qb.andWhere('`guestUser`.idx = :userIdx', { userIdx: user['idx'] });
            }
        })
            .getOne();
        if (!(0, lodash_1.get)(order, 'idx', '')) {
            throw new common_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return { order };
    }
    async findOneIdxByHost(userInfo, idx) {
        if (!idx) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const user = await this.usersService.findId(userInfo['id']);
        const order = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'guestUser')
            .leftJoinAndSelect('order.orderProduct', 'orderProduct')
            .leftJoinAndSelect('orderProduct.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('product.user', 'hostUser')
            .where(qb => {
            qb.where('`order`.idx = :idx', { idx: idx });
            if (!['root', 'admin'].includes(user['group']['id'])) {
                qb.andWhere('`hostUser`.idx = :userIdx', { userIdx: user['idx'] });
            }
        })
            .getOne();
        if (!(0, lodash_1.get)(order, 'idx', '')) {
            throw new common_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return { order };
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const order = await this.orderRepository.findOne({
            where: { idx: idx },
            relations: [
                'user',
                'user.device',
                'orderProduct',
                'orderProduct.productOption',
                'orderProduct.productOption.product',
                'orderProduct.productOption.product.user',
                'orderProduct.productOption.product.user.device'
            ]
        });
        if (!(0, lodash_1.get)(order, 'idx', '')) {
            throw new common_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return order;
    }
    async findOneCodeByNonmember(code) {
        if (!code) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const order = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'guestUser')
            .leftJoinAndSelect('order.orderProduct', 'orderProduct')
            .leftJoinAndSelect('orderProduct.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('product.user', 'hostUser')
            .where(qb => {
            qb.where('`order`.code = :code', { code: code });
        })
            .getOne();
        if (!(0, lodash_1.get)(order, 'idx', '')) {
            throw new common_1.NotFoundException('정보를 찾을 수 없습니다.');
        }
        return { order };
    }
    update(id, updateOrderDto) {
        return `This action updates a #${id} order`;
    }
    async guestOrderCancel(code, userInfo) {
        if (!code) {
            throw new common_1.NotFoundException('취소할 정보가 없습니다.');
        }
        const user = await this.userService.findId((0, lodash_1.get)(userInfo, 'id'));
        const order = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('order.orderProduct', 'orderProduct')
            .leftJoinAndSelect('orderProduct.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .where(qb => {
            qb.where('`user`.idx = :userIdx', { userIdx: user['idx'] });
            qb.andWhere('`order`.code = :code', { code: code });
        })
            .getOne();
        if (!(0, lodash_1.get)(order, 'idx', '')) {
            throw new common_1.NotFoundException('취소할 주문이 없습니다.');
        }
        const cancelReason = '게스트 취소';
        await this.cancelProcess(order, cancelReason);
        const po = await this.productOptionService.findIdx(+(0, lodash_1.get)(order, ['orderProduct', '0', 'productOption', 'idx']));
        const hostUser = (0, lodash_1.get)(po, ['product', 'user']);
        if ((0, lodash_1.get)(hostUser, ['device', 'token'], '')) {
            await this.pushNotiService.guestOrderCancelPush(hostUser, po);
        }
    }
    async hostOrderApproval(code, userInfo) {
        if (!code) {
            throw new common_1.NotFoundException('변경할 정보가 없습니다.');
        }
        const user = await this.userService.findId((0, lodash_1.get)(userInfo, 'id'));
        const order = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.orderProduct', 'orderProduct')
            .leftJoinAndSelect('orderProduct.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('product.user', 'user')
            .where(qb => {
            qb.where('`user`.idx = :userIdx', { userIdx: user['idx'] });
            qb.andWhere('`order`.code = :code', { code: code });
        })
            .getOne();
        if (!(0, lodash_1.get)(order, 'idx', '')) {
            throw new common_1.NotFoundException('변경할 주문이 없습니다.');
        }
        const shipping_status = common_utils_1.commonUtils.getStatus(['order_status', 'shipping']);
        if (order['status'] == shipping_status) {
            throw new common_1.NotAcceptableException('이미 승인 처리된 주문입니다.');
        }
        await this.statusChange(order['idx'], shipping_status);
        await this.orderProductService.statusChange(order['idx'], shipping_status);
        const orderInfo = await this.findOneIdx(+(0, lodash_1.get)(order, ['idx']));
        const guestUser = (0, lodash_1.get)(orderInfo, 'user');
        if ((0, lodash_1.get)(guestUser, ['device', 'token'], '')) {
            await this.pushNotiService.hostOrderApprovalPush(guestUser, orderInfo);
        }
    }
    async hostOrderCancel(code, userInfo, updateOrderDto) {
        if (!code) {
            throw new common_1.NotFoundException('변경할 정보가 없습니다.');
        }
        const user = await this.userService.findId((0, lodash_1.get)(userInfo, 'id'));
        const order = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.orderProduct', 'orderProduct')
            .leftJoinAndSelect('orderProduct.productOption', 'productOption')
            .leftJoinAndSelect('productOption.product', 'product')
            .leftJoinAndSelect('product.user', 'user')
            .where(qb => {
            qb.where('`user`.idx = :userIdx', { userIdx: user['idx'] });
            qb.andWhere('`order`.code = :code', { code: code });
        })
            .getOne();
        if (!(0, lodash_1.get)(order, 'idx', '')) {
            throw new common_1.NotFoundException('변경할 주문이 없습니다.');
        }
        const cancelReason = '호스트 취소(' + (0, lodash_1.get)(updateOrderDto, 'cancelReason', '') + ')';
        await this.cancelProcess(order, cancelReason);
        const orderInfo = await this.findOneIdx(+(0, lodash_1.get)(order, ['idx']));
        const guestUser = (0, lodash_1.get)(orderInfo, 'user');
        if ((0, lodash_1.get)(guestUser, ['device', 'token'], '')) {
            await this.pushNotiService.hostOrderCancelPush(guestUser, orderInfo);
        }
    }
    async cancelProcess(order, cancelReason) {
        const cancel_status = common_utils_1.commonUtils.getStatus(['order_status', 'cancellationCompleted']);
        if (order['status'] == cancel_status) {
            throw new common_1.NotAcceptableException('이미 취소 처리된 주문입니다.');
        }
        const cancelPrice = (0, lodash_1.reduce)(order.orderProduct, (o, o1) => {
            return o + (+o1['payPrice']);
        }, 0);
        if (order['imp_uid']) {
            await this.iamportService.paymentCancel(order['imp_uid'], cancelPrice, cancelReason);
        }
        await this.statusChange(order['idx'], cancel_status);
        await this.orderProductService.statusChange(order['idx'], cancel_status, cancelReason);
        await this.orderProductService.cancelPrice(order['idx'], cancelPrice);
        await this.ordertotalService.priceChange(order['idx'], cancelPrice);
    }
    async statusChange(idx, status) {
        await this.orderRepository.createQueryBuilder()
            .update(order_entity_1.OrderEntity)
            .set({ status: status })
            .where(" idx = :idx", { idx: idx })
            .execute();
    }
    async test(order_idx, price) {
    }
    remove(id) {
        return `This action removes a #${id} order`;
    }
    async orderVerification(createOrderDto) {
        const { response } = await this.iamportService.getPaymentByImpUid(createOrderDto['imp_uid']);
        const result = { status: true, message: '' };
        if (response['amount'] != createOrderDto['price']) {
            result['status'] = false;
            result['message'] = '실 결제 정보와 다름';
        }
        if (!result['status']) {
            await this.iamportService.paymentCancel(createOrderDto['imp_uid'], response['amount'], result['message']);
            throw new common_1.NotAcceptableException(result['message']);
        }
        return response;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_service_1.ProductService,
        users_service_1.UsersService,
        product_option_service_1.ProductOptionService,
        users_service_1.UsersService,
        order_product_service_1.OrderProductService,
        order_total_service_1.OrderTotalService,
        iamport_service_1.IamportService,
        pg_data_service_1.PgDataService,
        push_notification_service_1.PushNotificationService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map