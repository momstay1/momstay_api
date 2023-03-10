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
    findAll() {
        return this.pushNotificationService.findAll();
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PushNotificationController.prototype, "findAll", null);
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
    __metadata("design:paramtypes", [push_notification_service_1.PushNotificationService])
], PushNotificationController);
exports.PushNotificationController = PushNotificationController;
//# sourceMappingURL=push-notification.controller.js.map