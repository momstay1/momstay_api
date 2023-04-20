"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipModule = void 0;
const common_1 = require("@nestjs/common");
const membership_service_1 = require("./membership.service");
const membership_controller_1 = require("./membership.controller");
const typeorm_1 = require("@nestjs/typeorm");
const membership_history_entity_1 = require("./entities/membership-history.entity");
const admin_membership_controller_1 = require("./admin-membership.controller");
const users_module_1 = require("../users/users.module");
const product_module_1 = require("../product/product.module");
const excel_service_1 = require("../excel/excel.service");
const email_module_1 = require("../email/email.module");
const settings_module_1 = require("../settings/settings.module");
let MembershipModule = class MembershipModule {
};
MembershipModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([membership_history_entity_1.MembershipHistoryEntity]),
            users_module_1.UsersModule,
            product_module_1.ProductModule,
            settings_module_1.SettingsModule,
            email_module_1.EmailModule,
            settings_module_1.SettingsModule
        ],
        controllers: [membership_controller_1.MembershipController, admin_membership_controller_1.AdminMembershipController],
        providers: [membership_service_1.MembershipService, excel_service_1.ExcelService],
        exports: [membership_service_1.MembershipService],
    })
], MembershipModule);
exports.MembershipModule = MembershipModule;
//# sourceMappingURL=membership.module.js.map