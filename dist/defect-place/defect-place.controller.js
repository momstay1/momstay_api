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
exports.DefectPlaceController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const role_decorator_1 = require("../common/decorator/role.decorator");
const defect_place_service_1 = require("./defect-place.service");
const create_defect_place_dto_1 = require("./dto/create-defect-place.dto");
const update_defect_place_dto_1 = require("./dto/update-defect-place.dto");
let DefectPlaceController = class DefectPlaceController {
    constructor(defectPlaceService) {
        this.defectPlaceService = defectPlaceService;
    }
    sanitizeDefectPlace(data) {
        return common_utils_1.commonUtils.sanitizeEntity(data, this.defectPlaceService.getPrivateColumn());
    }
    ;
    async create(createDefectPlaceDto) {
        const dfp = await this.defectPlaceService.create(createDefectPlaceDto);
        return await this.sanitizeDefectPlace(dfp);
    }
    async uploadExcel(idx, excel) {
        return await this.defectPlaceService.uploadExcel(idx, excel);
    }
    async findAll(place, take, page) {
        const { results, total, pageTotal } = await this.defectPlaceService.findAll(place, { take, page });
        return {
            results: (0, lodash_1.map)(results, (obj) => {
                return this.sanitizeDefectPlace(obj);
            }),
            total,
            pageTotal
        };
    }
    async sampleExcel(res) {
        await this.defectPlaceService.sampleExcel(res);
    }
    async findOne(idx) {
        const dfp = await this.defectPlaceService.findOne(+idx);
        return this.sanitizeDefectPlace(dfp);
    }
    async update(idx, updateDefectPlaceDto) {
        const dfp = await this.defectPlaceService.update(+idx, updateDefectPlaceDto);
        return this.sanitizeDefectPlace(dfp);
    }
    async remove(idxs) {
        return await this.defectPlaceService.removes(idxs);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자_하자현장등록 API' }),
    (0, swagger_1.ApiBody)({ type: create_defect_place_dto_1.CreateDefectPlaceDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_defect_place_dto_1.CreateDefectPlaceDto]),
    __metadata("design:returntype", Promise)
], DefectPlaceController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("excel/:idx"),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('excel')),
    (0, swagger_1.ApiOperation)({ summary: '하자현장엑셀 업로드 API' }),
    __param(0, (0, common_1.Param)('idx')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DefectPlaceController.prototype, "uploadExcel", null);
__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자_하자현장 리스트 API' }),
    __param(0, (0, common_1.Query)('place')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], DefectPlaceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("sample-excel"),
    (0, swagger_1.ApiOperation)({ summary: '하자현장엑셀샘플 다운로드 API' }),
    (0, common_1.Header)('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    (0, common_1.Header)('Content-Disposition', 'attachment; filename=defect_place_sample.xlsx'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DefectPlaceController.prototype, "sampleExcel", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, role_decorator_1.Auth)(['root', 'admin', 'basic']),
    (0, swagger_1.ApiOperation)({ summary: '하자현장 정보 API' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DefectPlaceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':idx'),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자_하자현장수정 API' }),
    (0, swagger_1.ApiBody)({ type: create_defect_place_dto_1.CreateDefectPlaceDto }),
    __param(0, (0, common_1.Param)('idx')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_defect_place_dto_1.UpdateDefectPlaceDto]),
    __metadata("design:returntype", Promise)
], DefectPlaceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '하자현장삭제 API' }),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)('idxs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DefectPlaceController.prototype, "remove", null);
DefectPlaceController = __decorate([
    (0, common_1.Controller)('defect-place'),
    (0, swagger_1.ApiTags)('하자현장 API'),
    __metadata("design:paramtypes", [defect_place_service_1.DefectPlaceService])
], DefectPlaceController);
exports.DefectPlaceController = DefectPlaceController;
//# sourceMappingURL=defect-place.controller.js.map