"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSnsModule = void 0;
const common_1 = require("@nestjs/common");
const user_sns_service_1 = require("./user-sns.service");
const user_sns_controller_1 = require("./user-sns.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_sns_entity_1 = require("./entities/user-sns.entity");
let UserSnsModule = class UserSnsModule {
};
UserSnsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_sns_entity_1.UserSnsEntity]),
        ],
        controllers: [user_sns_controller_1.UserSnsController],
        providers: [user_sns_service_1.UserSnsService],
        exports: [user_sns_service_1.UserSnsService],
    })
], UserSnsModule);
exports.UserSnsModule = UserSnsModule;
//# sourceMappingURL=user-sns.module.js.map