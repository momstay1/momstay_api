"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportCumulativeModule = void 0;
const common_1 = require("@nestjs/common");
const report_cumulative_service_1 = require("./report-cumulative.service");
const report_cumulative_controller_1 = require("./report-cumulative.controller");
const typeorm_1 = require("@nestjs/typeorm");
const report_cumulative_entity_1 = require("./entities/report-cumulative.entity");
const users_module_1 = require("../users/users.module");
const report_content_entity_1 = require("./entities/report-content.entity");
const report_content_service_1 = require("./report-content.service");
const report_content_controller_1 = require("./report-content.controller");
let ReportCumulativeModule = class ReportCumulativeModule {
};
ReportCumulativeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([report_cumulative_entity_1.ReportCumulativeEntity, report_content_entity_1.ReportContentEntity]),
            users_module_1.UsersModule
        ],
        controllers: [report_cumulative_controller_1.ReportCumulativeController, report_content_controller_1.ReportContentController],
        providers: [report_cumulative_service_1.ReportCumulativeService, report_content_service_1.ReportContentService],
        exports: [report_cumulative_service_1.ReportCumulativeService, report_content_service_1.ReportContentService]
    })
], ReportCumulativeModule);
exports.ReportCumulativeModule = ReportCumulativeModule;
//# sourceMappingURL=report-cumulative.module.js.map