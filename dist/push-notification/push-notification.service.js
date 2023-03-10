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
exports.PushNotificationService = void 0;
const dist_1 = require("@nestjs/axios/dist");
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config/config.service");
const googleapis_1 = require("googleapis");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("@nestjs/typeorm");
const push_history_entity_1 = require("./entities/push-history.entity");
const typeorm_2 = require("typeorm");
const lodash_1 = require("lodash");
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const MESSAGING_URL = 'https://fcm.googleapis.com/v1/projects/momstay-50e27/messages:send';
let accessToken;
let PushNotificationService = class PushNotificationService {
    constructor(pushHistoryRepository, http) {
        this.pushHistoryRepository = pushHistoryRepository;
        this.http = http;
    }
    async sendPush(target, notification) {
        const message = { notification };
        if ((0, lodash_1.get)(target, 'topic', '')) {
            message['topic'] = target['topic'];
        }
        else {
            message['token'] = target['token'];
        }
        try {
            const response = await this.sendFcmMessage({ message });
            await this.historySave(response);
        }
        catch (error) {
            await this.historySave(error.response);
        }
    }
    async historySave(response) {
        const data = JSON.parse(response.config.data);
        const push_history_data = {
            status: '' + response.status,
            topic: (0, lodash_1.get)(data, ['message', 'topic'], ''),
            token: (0, lodash_1.get)(data, ['message', 'token'], ''),
            data: (0, lodash_1.get)(data, ['message', 'data'], '') && JSON.stringify((0, lodash_1.get)(data, ['message', 'data'])),
            notifications: response.config.data,
            error: (0, lodash_1.get)(response, ['data', 'error'], '') && JSON.stringify((0, lodash_1.get)(response, ['data', 'error'])),
        };
        const pushHistory = await this.pushHistoryRepository.create(push_history_data);
        await this.pushHistoryRepository.save(pushHistory);
    }
    async sendFcmMessage(fcmMessage) {
        const http = this.http;
        if (!accessToken) {
            console.log({ accessToken });
            accessToken = await this.getAccessToken();
            console.log({ accessToken });
        }
        const url = MESSAGING_URL;
        const headersRequest = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
        };
        const response = await (0, rxjs_1.firstValueFrom)(http.post(url, JSON.stringify(fcmMessage), {
            headers: headersRequest,
        }));
        return response;
    }
    async getAccessToken() {
        const configService = new config_service_1.ConfigService(process.env);
        const firebaseConfig = configService.getFireBaseConfig();
        const jwtClient = new googleapis_1.google.auth.JWT(firebaseConfig.firebase_client_email, null, firebaseConfig.firebase_private_key.replace(/\\n/gm, '\n'), [MESSAGING_SCOPE], null);
        const tokens = await jwtClient.authorize();
        return tokens.access_token;
    }
    create(createPushNotificationDto) {
        return 'This action adds a new pushNotification';
    }
    findAll() {
        return `This action returns all pushNotification`;
    }
    findOne(id) {
        return `This action returns a #${id} pushNotification`;
    }
    update(id, updatePushNotificationDto) {
        return `This action updates a #${id} pushNotification`;
    }
    remove(id) {
        return `This action removes a #${id} pushNotification`;
    }
    async isApp(device) {
        return ['android', 'ios'].includes((0, lodash_1.get)(device, 'environment', 'web'));
    }
    async guestOrderPush(hostUser, po) {
        const isApp = await this.isApp((0, lodash_1.get)(hostUser, ['device']));
        if (isApp) {
            const target = {
                token: hostUser['device']['token'],
            };
            const notifications = {
                title: po['product']['title'] + '숙소 ' + po['title'] + '방 결제가 완료되었습니다.',
                body: po['product']['title'] + '숙소 ' + po['title'] + '방 결제가 완료되었습니다.',
            };
            await this.sendPush(target, notifications);
        }
    }
    async guestOrderCancelPush(hostUser, po) {
        const isApp = await this.isApp((0, lodash_1.get)(hostUser, ['device']));
        if (isApp) {
            const target = {
                token: hostUser['device']['token'],
            };
            const notifications = {
                title: po['product']['title'] + '숙소 ' + po['title'] + '방 결제를 취소했습니다.',
                body: po['product']['title'] + '숙소 ' + po['title'] + '방 결제를 취소했습니다.',
            };
            await this.sendPush(target, notifications);
        }
    }
    async hostOrderCancelPush(guestUser, order) {
        const isApp = await this.isApp((0, lodash_1.get)(guestUser, ['device']));
        if (isApp) {
            const target = {
                token: guestUser['device']['token'],
            };
            const notifications = {
                title: '호스트가 ' + order['orderProduct']['productOption']['product']['title']
                    + '숙소 ' + order['orderProduct']['productOption']['title'] + '방 결제를 거절했습니다.',
                body: '호스트가 ' + order['orderProduct']['productOption']['product']['title']
                    + '숙소 ' + order['orderProduct']['productOption']['title'] + '방 결제를 거절했습니다.',
            };
            await this.sendPush(target, notifications);
        }
    }
    async hostOrderApprovalPush(guestUser, order) {
        const isApp = await this.isApp((0, lodash_1.get)(guestUser, ['device']));
        if (isApp) {
            const target = {
                token: guestUser['device']['token'],
            };
            const notifications = {
                title: '호스트가 ' + order['orderProduct']['productOption']['product']['title']
                    + '숙소 ' + order['orderProduct']['productOption']['title'] + '방 결제를 승인했습니다.',
                body: '호스트가 ' + order['orderProduct']['productOption']['product']['title']
                    + '숙소 ' + order['orderProduct']['productOption']['title'] + '방 결제를 승인했습니다.',
            };
            await this.sendPush(target, notifications);
        }
    }
    async guestReservationPush(hostUser, po) {
        const isApp = await this.isApp((0, lodash_1.get)(hostUser, ['device']));
        if (isApp) {
            const target = {
                token: hostUser['device']['token'],
            };
            const notifications = {
                title: po['product']['title'] + '숙소 ' + po['title'] + '방 방문예약이 있습니다.',
                body: po['product']['title'] + '숙소 ' + po['title'] + '방 방문예약이 있습니다.',
            };
            await this.sendPush(target, notifications);
        }
    }
    async guestReservationCancelPush(hostUser, reservation) {
        const isApp = await this.isApp((0, lodash_1.get)(hostUser, ['device']));
        if (isApp) {
            const target = {
                token: hostUser['device']['token'],
            };
            const notifications = {
                title: reservation['productOption']['product']['title']
                    + '숙소 '
                    + reservation['productOption']['title']
                    + '방 방문예약이 취소되었습니다.',
                body: reservation['productOption']['product']['title']
                    + '숙소 '
                    + reservation['productOption']['title']
                    + '방 방문예약이 취소되었습니다.',
            };
            await this.sendPush(target, notifications);
        }
    }
    async hostReservationCancelPush(guestUser, reservation) {
        const isApp = await this.isApp((0, lodash_1.get)(guestUser, ['device']));
        if (isApp) {
            const target = {
                token: guestUser['device']['token'],
            };
            const notifications = {
                title: '호스트가 '
                    + reservation['productOption']['product']['title']
                    + '숙소 '
                    + reservation['productOption']['title']
                    + '방 방문예약을 거절했습니다.',
                body: '호스트가 '
                    + reservation['productOption']['product']['title']
                    + '숙소 '
                    + reservation['productOption']['title']
                    + '방 방문예약을 거절했습니다.',
            };
            await this.sendPush(target, notifications);
        }
    }
    async hostReservationApprovalPush(guestUser, reservation) {
        const isApp = await this.isApp((0, lodash_1.get)(guestUser, ['device']));
        if (isApp) {
            const target = {
                token: guestUser['device']['token'],
            };
            const notifications = {
                title: '호스트가 '
                    + reservation['productOption']['product']['title']
                    + '숙소 '
                    + reservation['productOption']['title']
                    + '방 방문예약을 승인했습니다.',
                body: '호스트가 '
                    + reservation['productOption']['product']['title']
                    + '숙소 '
                    + reservation['productOption']['title']
                    + '방 방문예약을 승인했습니다.',
            };
            await this.sendPush(target, notifications);
        }
    }
};
PushNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(push_history_entity_1.PushHistoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        dist_1.HttpService])
], PushNotificationService);
exports.PushNotificationService = PushNotificationService;
//# sourceMappingURL=push-notification.service.js.map