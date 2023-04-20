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
exports.AdminEmailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const email_service_1 = require("./email.service");
let AdminEmailController = class AdminEmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async findAll(search) {
        const message = await this.emailService.emailFindAll(search);
        return { message };
    }
    async test() {
        const { mail, email_tmpl } = await this.emailService.mailSettings({ type: 'reservation', group: 'host', code: 'request', lang: 'ko' }, {});
        await this.emailService.sendMail('shjeon2500@naver.com', mail.title, email_tmpl);
    }
    async update(idx, status) {
        return await this.emailService.update(+idx, status);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '메일 리스트 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: "search",
        description: 'search=status:상태값(1:미사용|2:사용, 기본값:2)<br>'
            + 'search=group:(admin|host|guest)<br>'
            + 'search=type:메일 타입<br>'
            + 'search=code:메일 코드<br>',
        required: false
    }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AdminEmailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminEmailController.prototype, "test", null);
__decorate([
    (0, common_1.Patch)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '메일 상태 수정 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({
        name: 'idx',
        description: '메일 idx'
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                status: { type: 'string' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('idx')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminEmailController.prototype, "update", null);
AdminEmailController = __decorate([
    (0, common_1.Controller)('admin/email'),
    (0, swagger_1.ApiTags)('이메일(관리자) API'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], AdminEmailController);
exports.AdminEmailController = AdminEmailController;
//# sourceMappingURL=admin-email.controller.js.map