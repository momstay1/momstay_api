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
exports.PopupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("@nestjs/common/decorators");
const popup_service_1 = require("./popup.service");
const popup_entity_1 = require("./entities/popup.entity");
let PopupController = class PopupController {
    constructor(popupService) {
        this.popupService = popupService;
    }
    async getPopup(id, page) {
        return await this.popupService.getPopup(id, page);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: '팝업 리스트 호출 API' }),
    (0, swagger_1.ApiCreatedResponse)({ type: popup_entity_1.PopupEntity }),
    (0, swagger_1.ApiQuery)({ name: 'id', description: 'popup id', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', description: 'popup page', required: false }),
    __param(0, (0, decorators_1.Query)('id')),
    __param(1, (0, decorators_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PopupController.prototype, "getPopup", null);
PopupController = __decorate([
    (0, common_1.Controller)('popup'),
    (0, swagger_1.ApiTags)('팝업 API'),
    __metadata("design:paramtypes", [popup_service_1.PopupService])
], PopupController);
exports.PopupController = PopupController;
//# sourceMappingURL=popup.controller.js.map