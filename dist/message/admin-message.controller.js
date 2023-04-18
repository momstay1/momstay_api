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
exports.AdminMessageController = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
let AdminMessageController = class AdminMessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async findAll(search) {
        const message = await this.messageService.messageFindAll(search);
        const messageType = await this.messageService.messageTypeFindAll();
        return { message, messageType };
    }
    async findOne(code) {
        return await this.messageService.messageFindOne(code);
    }
    async test(phone, type) {
        const data = {
            shop: 1111,
            name_order: 'test',
            ord_code: 'd82he',
            ordp_title: '테스트상품 외 1',
            total_pay_price: 50000
        };
        await this.messageService.send([phone], type, data);
    }
    async update(idx, code, status, tmpl) {
        return await this.messageService.update(+idx, code, status, tmpl);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '메시지 리스트 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: "search",
        description: 'search=status:상태값(1:미사용|2:사용, 기본값:2)<br>'
            + 'search=group:(admin|host|guest)<br>'
            + 'search=type:메시지 타입<br>'
            + 'search=sendtype:발송 타입(alimtalk|sms)<br>'
            + 'search=code:메시지코드<br>',
        required: false
    }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AdminMessageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':code'),
    (0, swagger_1.ApiOperation)({ summary: '메시지 조회(비즈엠 템플릿 조회) API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({
        name: 'code',
        description: '비즈엠 템플릿 코드 message.code'
    }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminMessageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiOperation)({ summary: '메시지 발송 테스트 API' }),
    __param(0, (0, common_1.Query)('phone')),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminMessageController.prototype, "test", null);
__decorate([
    (0, common_1.Patch)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '메시지 상태 및 템플릿 수정 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({
        name: 'idx',
        description: '메시지 idx'
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                code: { type: 'string' },
                status: { type: 'string' },
                tmpl: { type: 'string' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('idx')),
    __param(1, (0, common_1.Body)('code')),
    __param(2, (0, common_1.Body)('status')),
    __param(3, (0, common_1.Body)('tmpl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminMessageController.prototype, "update", null);
AdminMessageController = __decorate([
    (0, common_1.Controller)('admin/message'),
    (0, swagger_1.ApiTags)('메시지(관리자) API'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], AdminMessageController);
exports.AdminMessageController = AdminMessageController;
//# sourceMappingURL=admin-message.controller.js.map