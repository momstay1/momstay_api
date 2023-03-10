"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const auth_module_1 = require("../auth/auth.module");
const common_service_1 = require("../common/common.service");
const groups_module_1 = require("../groups/groups.module");
const admin_users_controller_1 = require("./admin-users.controller");
const user_sns_module_1 = require("../user-sns/user-sns.module");
const file_module_1 = require("../file/file.module");
const login_module_1 = require("../login/login.module");
const email_module_1 = require("../email/email.module");
const refresh_token_module_1 = require("../refresh-token/refresh-token.module");
const iamport_service_1 = require("../iamport/iamport.service");
const device_module_1 = require("../device/device.module");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UsersEntity]),
            groups_module_1.GroupsModule,
            user_sns_module_1.UserSnsModule,
            file_module_1.FileModule,
            email_module_1.EmailModule,
            login_module_1.LoginModule,
            refresh_token_module_1.RefreshTokenModule,
            device_module_1.DeviceModule,
        ],
        controllers: [users_controller_1.UsersController, admin_users_controller_1.AdminUsersController],
        providers: [users_service_1.UsersService, common_service_1.CommonService, iamport_service_1.IamportService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map