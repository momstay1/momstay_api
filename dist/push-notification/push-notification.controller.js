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
exports.PushNotificationController = void 0;
const common_1 = require("@nestjs/common");
const push_notification_service_1 = require("./push-notification.service");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let PushNotificationController = class PushNotificationController {
    constructor(pushNotificationService) {
        this.pushNotificationService = pushNotificationService;
    }
    async test(topic, token, title, body) {
        const target = {
            token: '',
            topic: 'marketing',
        };
        const notifications = {
            title: '앱 푸시 테스트',
            body: '앱 푸시 테스트 입니다.',
        };
        if (topic) {
            target['topic'] = topic;
            target['token'] = '';
        }
        if (token) {
            target['token'] = token;
            target['topic'] = '';
        }
        if (title) {
            notifications['title'] = title;
        }
        if (body) {
            notifications['body'] = body;
        }
        const response = await this.pushNotificationService.sendPush(target, notifications);
        await this.pushNotificationService.historySave(response);
    }
    async findAll(user, take, page, search, order) {
        const { data } = await this.pushNotificationService.findAll({ take, page }, search, order, user);
        return Object.assign({}, data);
    }
    async findAllNonMember(take, page, search, order) {
        const { data } = await this.pushNotificationService.findAll({ take, page }, search, order);
        return Object.assign({}, data);
    }
};
__decorate([
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiOperation)({
        summary: 'app push test',
        description: 'topic, token 둘중 하나만 설정 필요'
    }),
    (0, swagger_1.ApiQuery)({
        name: "topic",
        description: 'topic전달 값 token 빈값으로 설정',
        required: false
    }),
    (0, swagger_1.ApiQuery)({
        name: "token",
        description: 'token전달 값 topic 빈값으로 설정',
        required: false
    }),
    (0, swagger_1.ApiQuery)({
        name: "title",
        description: '앱 푸시 제목',
        required: false
    }),
    (0, swagger_1.ApiQuery)({
        name: "body",
        description: '앱 푸시 설명',
        required: false
    }),
    __param(0, (0, common_1.Query)('topic')),
    __param(1, (0, common_1.Query)('token')),
    __param(2, (0, common_1.Query)('title')),
    __param(3, (0, common_1.Query)('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PushNotificationController.prototype, "test", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '알림 리스트 API' }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: "search",
        required: false
    }),
    (0, swagger_1.ApiQuery)({
        name: "order",
        description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
        required: false
    }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity, Number, Number, Array, String]),
    __metadata("design:returntype", Promise)
], PushNotificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('nonmember'),
    (0, swagger_1.ApiOperation)({ summary: '비회원 알림 리스트 API' }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        required: false
    }),
    (0, swagger_1.ApiQuery)({
        name: "order",
        description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
        required: false
    }),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, String]),
    __metadata("design:returntype", Promise)
], PushNotificationController.prototype, "findAllNonMember", null);
PushNotificationController = __decorate([
    (0, common_1.Controller)('push-notification'),
    (0, swagger_1.ApiTags)('알림 API'),
    __metadata("design:paramtypes", [push_notification_service_1.PushNotificationService])
], PushNotificationController);
exports.PushNotificationController = PushNotificationController;
//# sourceMappingURL=push-notification.controller.js.map