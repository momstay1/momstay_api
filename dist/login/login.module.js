"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const common_1 = require("@nestjs/common");
const login_service_1 = require("./login.service");
const login_controller_1 = require("./login.controller");
const typeorm_1 = require("@nestjs/typeorm");
const login_entity_1 = require("./entities/login.entity");
let LoginModule = class LoginModule {
};
LoginModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([login_entity_1.LoginEntity]),
        ],
        controllers: [login_controller_1.LoginController],
        providers: [login_service_1.LoginService],
        exports: [login_service_1.LoginService],
    })
], LoginModule);
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.module.js.map