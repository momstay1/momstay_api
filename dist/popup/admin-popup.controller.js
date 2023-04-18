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
exports.AdminPopupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("@nestjs/common/decorators");
const popup_service_1 = require("./popup.service");
const create_popup_dto_1 = require("./dto/create-popup.dto");
const update_popup_dto_1 = require("./dto/update-popup.dto");
const role_decorator_1 = require("../common/decorator/role.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const common_file_1 = require("../common/common.file");
const popup_entity_1 = require("./entities/popup.entity");
let AdminPopupController = class AdminPopupController {
    constructor(popupService) {
        this.popupService = popupService;
    }
    async create(createPopupDto, files) {
        return await this.popupService.create(createPopupDto, files);
    }
    async findAll(page, take) {
        const { data } = await this.popupService.findAll({ take, page });
        return Object.assign({}, data);
    }
    async findOne(idx) {
        return await this.popupService.findOne(idx);
    }
    async update(idx, updatePopupDto, files) {
        return await this.popupService.update(+idx, updatePopupDto, files);
    }
    async delete(idxs) {
        await this.popupService.delete(idxs);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '팝업 생성 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'popupImg', maxCount: 1 }], (0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_popup_dto_1.CreatePopupDto,
        Array]),
    __metadata("design:returntype", Promise)
], AdminPopupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '팝업 리스트 조회 API' }),
    __param(0, (0, decorators_1.Query)('page')),
    __param(1, (0, decorators_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminPopupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '팝업 상세 조회 API' }),
    (0, swagger_1.ApiCreatedResponse)({ type: popup_entity_1.PopupEntity }),
    (0, swagger_1.ApiParam)({ name: 'idx', description: 'popup idx' }),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminPopupController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':idx'),
    (0, swagger_1.ApiOperation)({
        summary: '팝업 수정 API',
        description: 'status, title, startPeriod, endPeriod, order, link, popupImg 만 변경 가능',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'idx', description: 'popup idx' }),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'popupImg', maxCount: 1 }], (0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Param)('idx')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_popup_dto_1.UpdatePopupDto,
        Array]),
    __metadata("design:returntype", Promise)
], AdminPopupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: '팝업 삭제 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        description: 'popup idx를 배열로 전달 ex) [1,2,3]',
        schema: {
            properties: {
                idxs: {
                    example: [],
                },
            },
        },
    }),
    (0, decorators_1.HttpCode)(204),
    __param(0, (0, common_1.Body)('idxs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AdminPopupController.prototype, "delete", null);
AdminPopupController = __decorate([
    (0, common_1.Controller)('admin/popup'),
    (0, swagger_1.ApiTags)('팝업(관리자) API'),
    __metadata("design:paramtypes", [popup_service_1.PopupService])
], AdminPopupController);
exports.AdminPopupController = AdminPopupController;
//# sourceMappingURL=admin-popup.controller.js.map