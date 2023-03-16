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
exports.ReportCumulativeController = void 0;
const common_1 = require("@nestjs/common");
const report_cumulative_service_1 = require("./report-cumulative.service");
const create_report_cumulative_dto_1 = require("./dto/create-report-cumulative.dto");
const update_report_cumulative_dto_1 = require("./dto/update-report-cumulative.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let ReportCumulativeController = class ReportCumulativeController {
    constructor(reportCumulativeService) {
        this.reportCumulativeService = reportCumulativeService;
    }
    async create(user, createReportCumulativeDto) {
        return await this.reportCumulativeService.create(user, createReportCumulativeDto);
    }
    async findAll(take, page, order) {
        const { data } = await this.reportCumulativeService.findAll({ take, page }, order);
        return Object.assign({}, data);
    }
    async findOne(idx) {
        const reportCumulative = await this.reportCumulativeService.findOneIdx(+idx);
        return { reportCumulative };
    }
    update(id, updateReportCumulativeDto) {
        return this.reportCumulativeService.update(+id, updateReportCumulativeDto);
    }
    remove(id) {
        return this.reportCumulativeService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '신고 등록 API' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity,
        create_report_cumulative_dto_1.CreateReportCumulativeDto]),
    __metadata("design:returntype", Promise)
], ReportCumulativeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '신고 내역 리스트 조회 API (미사용)' }),
    (0, role_decorator_1.Auth)(['admin', 'root']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: "order",
        description: 'ex) createdAt:DESC',
        required: false
    }),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ReportCumulativeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '신고 내역 상세 조회 API (미사용)' }),
    (0, role_decorator_1.Auth)(['admin', 'root']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportCumulativeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_report_cumulative_dto_1.UpdateReportCumulativeDto]),
    __metadata("design:returntype", void 0)
], ReportCumulativeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportCumulativeController.prototype, "remove", null);
ReportCumulativeController = __decorate([
    (0, common_1.Controller)('report-cumulative'),
    (0, swagger_1.ApiTags)('신고 API'),
    __metadata("design:paramtypes", [report_cumulative_service_1.ReportCumulativeService])
], ReportCumulativeController);
exports.ReportCumulativeController = ReportCumulativeController;
//# sourceMappingURL=report-cumulative.controller.js.map