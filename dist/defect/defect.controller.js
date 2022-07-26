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
exports.DefectController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
const common_utils_1 = require("../common/common.utils");
const role_decorator_1 = require("../common/decorator/role.decorator");
const defect_service_1 = require("./defect.service");
const create_defect_dto_1 = require("./dto/create-defect.dto");
const update_defect_dto_1 = require("./dto/update-defect.dto");
let DefectController = class DefectController {
    constructor(defectService) {
        this.defectService = defectService;
    }
    sanitizeDefect(data) {
        return common_utils_1.commonUtils.sanitizeEntity(data, this.defectService.getPrivateColumn());
    }
    ;
    create(createDefectDto) {
        return this.defectService.create(createDefectDto);
    }
    async findAll(place, take, page, order, sort, search) {
        const { results, total, pageTotal } = await this.defectService.findAll(place, { take, page }, { order, sort }, search);
        return {
            results: (0, lodash_1.map)(results, (obj) => {
                return this.sanitizeDefect(obj);
            }),
            total,
            pageTotal
        };
    }
    findOne(id) {
        return this.defectService.findOne(+id);
    }
    update(id, updateDefectDto) {
        return this.defectService.update(+id, updateDefectDto);
    }
    remove(id) {
        return this.defectService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_defect_dto_1.CreateDefectDto]),
    __metadata("design:returntype", void 0)
], DefectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자_현장 하자관리 리스트 API' }),
    __param(0, (0, common_1.Query)('place')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('order')),
    __param(4, (0, common_1.Query)('sort')),
    __param(5, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, String, Array]),
    __metadata("design:returntype", Promise)
], DefectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DefectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_defect_dto_1.UpdateDefectDto]),
    __metadata("design:returntype", void 0)
], DefectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DefectController.prototype, "remove", null);
DefectController = __decorate([
    (0, common_1.Controller)('defect'),
    (0, swagger_1.ApiTags)('하자관리 API'),
    __metadata("design:paramtypes", [defect_service_1.DefectService])
], DefectController);
exports.DefectController = DefectController;
//# sourceMappingURL=defect.controller.js.map