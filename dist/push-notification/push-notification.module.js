"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationModule = void 0;
const common_1 = require("@nestjs/common");
const push_notification_service_1 = require("./push-notification.service");
const push_notification_controller_1 = require("./push-notification.controller");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const push_history_entity_1 = require("./entities/push-history.entity");
let PushNotificationModule = class PushNotificationModule {
};
PushNotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([push_history_entity_1.PushHistoryEntity]),
            axios_1.HttpModule
        ],
        controllers: [push_notification_controller_1.PushNotificationController],
        providers: [push_notification_service_1.PushNotificationService],
        exports: [push_notification_service_1.PushNotificationService]
    })
], PushNotificationModule);
exports.PushNotificationModule = PushNotificationModule;
//# sourceMappingURL=push-notification.module.js.map