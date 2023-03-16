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
const create_push_notification_dto_1 = require("./dto/create-push-notification.dto");
const update_push_notification_dto_1 = require("./dto/update-push-notification.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let PushNotificationController = class PushNotificationController {
    constructor(pushNotificationService) {
        this.pushNotificationService = pushNotificationService;
    }
    create(createPushNotificationDto) {
        return this.pushNotificationService.create(createPushNotificationDto);
    }
    async test() {
        const target = {
            token: '5BAA98BFE537F9A4577F2899A647F122A0C9436F1421024A678E3211C93672C2',
            topic: '',
        };
        const notifications = {
            title: '앱 푸시 테스트',
            body: '앱 푸시 테스트 입니다.',
            data: {}
        };
        return await this.pushNotificationService.sendPush(target, notifications);
    }
    async findAll(user, take, page, search, order) {
        const { data } = await this.pushNotificationService.findAll({ take, page }, search, order, user);
        return Object.assign({}, data);
    }
    async findAllNonMember(take, page, search, order) {
        const { data } = await this.pushNotificationService.findAll({ take, page }, search, order);
        return Object.assign({}, data);
    }
    findOne(id) {
        return this.pushNotificationService.findOne(+id);
    }
    update(id, updatePushNotificationDto) {
        return this.pushNotificationService.update(+id, updatePushNotificationDto);
    }
    remove(id) {
        return this.pushNotificationService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_push_notification_dto_1.CreatePushNotificationDto]),
    __metadata("design:returntype", void 0)
], PushNotificationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
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
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PushNotificationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_push_notification_dto_1.UpdatePushNotificationDto]),
    __metadata("design:returntype", void 0)
], PushNotificationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PushNotificationController.prototype, "remove", null);
PushNotificationController = __decorate([
    (0, common_1.Controller)('push-notification'),
    (0, swagger_1.ApiTags)('알림 API'),
    __metadata("design:paramtypes", [push_notification_service_1.PushNotificationService])
], PushNotificationController);
exports.PushNotificationController = PushNotificationController;
//# sourceMappingURL=push-notification.controller.js.map