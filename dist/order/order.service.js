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
const moment = require("moment");
const users_service_1 = require("../users/users.service");
let OrderService = class OrderService {
    constructor(orderRepository, productService, productOptionService, userService) {
        this.orderRepository = orderRepository;
        this.productService = productService;
        this.productOptionService = productOptionService;
        this.userService = userService;
    }
    async create(createOrderDto, req) {
        const po = await this.productOptionService.findIdx(+createOrderDto['productOptionIdx']);
        let user = null;
        if ((0, lodash_1.get)(createOrderDto, 'userIdx', '')) {
            user = await this.userService.findIdx(+createOrderDto['userIdx']);
        }
        if (!(0, lodash_1.get)(createOrderDto, 'idx', 0)) {
            createOrderDto['code'] = await this.ordCreateCode();
            createOrderDto['userAgent'] = req.get('user-agent');
            createOrderDto['status'] = (0, lodash_1.get)(createOrderDto, 'status', 0);
            createOrderDto['pc_mobile'] = common_utils_1.commonUtils.isMobile(createOrderDto['userAgent']);
            createOrderDto['userIdx'] = user;
        }
        else {
            const order = await this.orderRepository.findOne({ idx: createOrderDto['idx'] });
            if (createOrderDto['status'] == 2) {
                createOrderDto['paiedAt'] = (0, lodash_1.get)(order, 'paiedAt', moment().format('YYYY-MM-DD'));
            }
        }
        const order_data = await this.orderRepository.create(createOrderDto);
        const order = await this.orderRepository.save(order_data);
        return { order };
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
    findAll() {
        return `This action returns all order`;
    }
    findOne(id) {
        return `This action returns a #${id} order`;
    }
    update(id, updateOrderDto) {
        return `This action updates a #${id} order`;
    }
    remove(id) {
        return `This action removes a #${id} order`;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_service_1.ProductService,
        product_option_service_1.ProductOptionService,
        users_service_1.UsersService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map