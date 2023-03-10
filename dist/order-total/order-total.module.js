"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTotalModule = void 0;
const common_1 = require("@nestjs/common");
const order_total_service_1 = require("./order-total.service");
const order_total_controller_1 = require("./order-total.controller");
const typeorm_1 = require("@nestjs/typeorm");
const order_total_entity_1 = require("./entities/order-total.entity");
let OrderTotalModule = class OrderTotalModule {
};
OrderTotalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_total_entity_1.OrderTotalEntity]),
        ],
        controllers: [order_total_controller_1.OrderTotalController],
        providers: [order_total_service_1.OrderTotalService],
        exports: [order_total_service_1.OrderTotalService]
    })
], OrderTotalModule);
exports.OrderTotalModule = OrderTotalModule;
//# sourceMappingURL=order-total.module.js.map