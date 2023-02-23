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
exports.OrderProductController = void 0;
const common_1 = require("@nestjs/common");
const order_product_service_1 = require("./order-product.service");
const create_order_product_dto_1 = require("./dto/create-order-product.dto");
const update_order_product_dto_1 = require("./dto/update-order-product.dto");
let OrderProductController = class OrderProductController {
    constructor(orderProductService) {
        this.orderProductService = orderProductService;
    }
    create(createOrderProductDto) {
        return this.orderProductService.create(createOrderProductDto);
    }
    findAll() {
        return this.orderProductService.findAll();
    }
    findOne(id) {
        return this.orderProductService.findOne(+id);
    }
    update(id, updateOrderProductDto) {
        return this.orderProductService.update(+id, updateOrderProductDto);
    }
    remove(id) {
        return this.orderProductService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_product_dto_1.CreateOrderProductDto]),
    __metadata("design:returntype", void 0)
], OrderProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_product_dto_1.UpdateOrderProductDto]),
    __metadata("design:returntype", void 0)
], OrderProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderProductController.prototype, "remove", null);
OrderProductController = __decorate([
    (0, common_1.Controller)('order-product'),
    __metadata("design:paramtypes", [order_product_service_1.OrderProductService])
], OrderProductController);
exports.OrderProductController = OrderProductController;
//# sourceMappingURL=order-product.controller.js.map