"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDormantModule = void 0;
const common_1 = require("@nestjs/common");
const user_dormant_service_1 = require("./user-dormant.service");
const user_dormant_controller_1 = require("./user-dormant.controller");
let UserDormantModule = class UserDormantModule {
};
UserDormantModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_dormant_controller_1.UserDormantController],
        providers: [user_dormant_service_1.UserDormantService]
    })
], UserDormantModule);
exports.UserDormantModule = UserDormantModule;
//# sourceMappingURL=user-dormant.module.js.map