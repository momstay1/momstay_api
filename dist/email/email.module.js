"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const email_service_1 = require("./email.service");
const email_code_entity_1 = require("./entities/email-code.entity");
const email_history_entity_1 = require("./entities/email-history.entity");
const email_tmpl_entity_1 = require("./entities/email-tmpl.entity");
const admin_email_controller_1 = require("./admin-email.controller");
const email_entity_1 = require("./entities/email.entity");
let EmailModule = class EmailModule {
};
EmailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                email_entity_1.EmailEntity,
                email_tmpl_entity_1.EmailTmplEntity,
                email_history_entity_1.EmailHistoryEntity,
                email_code_entity_1.EmailCodeEntity
            ]),
        ],
        controllers: [admin_email_controller_1.AdminEmailController],
        providers: [email_service_1.EmailService],
        exports: [email_service_1.EmailService],
    })
], EmailModule);
exports.EmailModule = EmailModule;
//# sourceMappingURL=email.module.js.map