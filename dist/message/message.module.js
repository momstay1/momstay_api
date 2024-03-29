"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const message_controller_1 = require("./message.controller");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("./entities/message.entity");
const message_history_entity_1 = require("./entities/message-history.entity");
const message_type_entity_1 = require("./entities/message-type.entity");
const admin_message_controller_1 = require("./admin-message.controller");
const settings_module_1 = require("../settings/settings.module");
const axios_1 = require("@nestjs/axios");
const admin_message_history_controller_1 = require("./admin-message-history.controller");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                message_entity_1.MessageEntity,
                message_history_entity_1.MessageHistoryEntity,
                message_type_entity_1.MessageTypeEntity
            ]),
            settings_module_1.SettingsModule,
            axios_1.HttpModule
        ],
        controllers: [message_controller_1.MessageController, admin_message_controller_1.AdminMessageController, admin_message_history_controller_1.AdminMessageHistoryController],
        providers: [message_service_1.MessageService],
        exports: [message_service_1.MessageService]
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map