"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const common_service_1 = require("../common/common.service");
const groups_module_1 = require("../groups/groups.module");
const admin_users_controller_1 = require("./admin-users.controller");
const admin_users_service_1 = require("./admin-users.service");
const admin_user_entity_1 = require("./entities/admin-user.entity");
let AdminUsersModule = class AdminUsersModule {
};
AdminUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            groups_module_1.GroupsModule,
            typeorm_1.TypeOrmModule.forFeature([admin_user_entity_1.AdminUsersEntity]),
        ],
        controllers: [admin_users_controller_1.AdminUsersController],
        providers: [admin_users_service_1.AdminUsersService, common_service_1.CommonService],
        exports: [admin_users_service_1.AdminUsersService],
    })
], AdminUsersModule);
exports.AdminUsersModule = AdminUsersModule;
//# sourceMappingURL=admin-users.module.js.map