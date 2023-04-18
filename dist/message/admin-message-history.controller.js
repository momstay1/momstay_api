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
exports.AdminMessageHistoryController = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
let AdminMessageHistoryController = class AdminMessageHistoryController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async findAll(year, month) {
        return await this.messageService.messageHistoryFindAll(year, month);
    }
};
__decorate([
    (0, common_1.Get)(':year/:month'),
    (0, swagger_1.ApiOperation)({ summary: '메시지 히스토리 리스트 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({
        name: "year",
        description: '년도',
    }),
    (0, swagger_1.ApiParam)({
        name: "month",
        description: '월',
    }),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminMessageHistoryController.prototype, "findAll", null);
AdminMessageHistoryController = __decorate([
    (0, common_1.Controller)('admin/message-history'),
    (0, swagger_1.ApiTags)('메시지 히스토리(관리자) API'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], AdminMessageHistoryController);
exports.AdminMessageHistoryController = AdminMessageHistoryController;
//# sourceMappingURL=admin-message-history.controller.js.map