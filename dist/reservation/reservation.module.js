"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationModule = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
const reservation_controller_1 = require("./reservation.controller");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_entity_1 = require("./entities/reservation.entity");
const product_option_module_1 = require("../product-option/product-option.module");
const users_module_1 = require("../users/users.module");
const file_module_1 = require("../file/file.module");
const push_notification_module_1 = require("../push-notification/push-notification.module");
const admin_reservation_controller_1 = require("./admin-reservation.controller");
const excel_service_1 = require("../excel/excel.service");
const email_module_1 = require("../email/email.module");
let ReservationModule = class ReservationModule {
};
ReservationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([reservation_entity_1.ReservationEntity]),
            product_option_module_1.ProductOptionModule,
            users_module_1.UsersModule,
            file_module_1.FileModule,
            push_notification_module_1.PushNotificationModule,
            email_module_1.EmailModule
        ],
        controllers: [reservation_controller_1.ReservationController, admin_reservation_controller_1.AdminReservationController],
        providers: [reservation_service_1.ReservationService, excel_service_1.ExcelService],
        exports: [reservation_service_1.ReservationService]
    })
], ReservationModule);
exports.ReservationModule = ReservationModule;
//# sourceMappingURL=reservation.module.js.map