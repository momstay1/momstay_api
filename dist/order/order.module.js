"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const product_module_1 = require("../product/product.module");
const product_option_module_1 = require("../product-option/product-option.module");
const users_module_1 = require("../users/users.module");
const order_product_module_1 = require("../order-product/order-product.module");
const order_total_module_1 = require("../order-total/order-total.module");
const iamport_service_1 = require("../iamport/iamport.service");
const pg_data_module_1 = require("../pg-data/pg-data.module");
const push_notification_module_1 = require("../push-notification/push-notification.module");
const admin_order_controller_1 = require("./admin-order.controller");
const settings_module_1 = require("../settings/settings.module");
const email_module_1 = require("../email/email.module");
const excel_service_1 = require("../excel/excel.service");
const message_module_1 = require("../message/message.module");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.OrderEntity]),
            product_module_1.ProductModule,
            users_module_1.UsersModule,
            product_option_module_1.ProductOptionModule,
            order_product_module_1.OrderProductModule,
            order_total_module_1.OrderTotalModule,
            pg_data_module_1.PgDataModule,
            users_module_1.UsersModule,
            push_notification_module_1.PushNotificationModule,
            settings_module_1.SettingsModule,
            email_module_1.EmailModule,
            message_module_1.MessageModule
        ],
        controllers: [order_controller_1.OrderController, admin_order_controller_1.AdminOrderController],
        providers: [order_service_1.OrderService, iamport_service_1.IamportService, excel_service_1.ExcelService],
        exports: [order_service_1.OrderService],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map