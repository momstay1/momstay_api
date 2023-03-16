"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportContentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const report_content_service_1 = require("./report-content.service");
let ReportContentController = class ReportContentController {
    constructor(reportContentService) {
        this.reportContentService = reportContentService;
    }
    findAll() {
        return this.reportContentService.findAll();
    }
    async findGroup(group) {
        const reportContent = await this.reportContentService.findGroup(group);
        return { reportContent };
    }
    async findOne(idx) {
        return await this.reportContentService.findOne(+idx);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportContentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('group/:group'),
    (0, swagger_1.ApiOperation)({ summary: '신고 내용 그룹 조회 API' }),
    __param(0, (0, common_1.Param)('group')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportContentController.prototype, "findGroup", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '신고 내용 상세 API' }),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportContentController.prototype, "findOne", null);
ReportContentController = __decorate([
    (0, common_1.Controller)('report-content'),
    (0, swagger_1.ApiTags)('신고 내용 API'),
    __metadata("design:paramtypes", [report_content_service_1.ReportContentService])
], ReportContentController);
exports.ReportContentController = ReportContentController;
//# sourceMappingURL=report-content.controller.js.map