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
const defect_service_1 = require("./defect.service");
const create_defect_dto_1 = require("./dto/create-defect.dto");
const update_defect_dto_1 = require("./dto/update-defect.dto");
let DefectController = class DefectController {
    constructor(defectService) {
        this.defectService = defectService;
    }
    create(createDefectDto) {
        return this.defectService.create(createDefectDto);
    }
    findAll() {
        return this.defectService.findAll();
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
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
    __metadata("design:paramtypes", [defect_service_1.DefectService])
], DefectController);
exports.DefectController = DefectController;
//# sourceMappingURL=defect.controller.js.map