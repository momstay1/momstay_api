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
const paginate_1 = require("../paginate");
const common_utils_1 = require("../common/common.utils");
const users_service_1 = require("../users/users.service");
const common_language_1 = require("../common/common.language");
const moment = require("moment");
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const MESSAGING_URL = 'https://fcm.googleapis.com/v1/projects/momstay-50e27/messages:send';
let accessToken;
const registrationStatus = '200';
const notificationStatus = '2';
let PushNotificationService = class PushNotificationService {
    constructor(pushHistoryRepository, http, userService) {
        this.pushHistoryRepository = pushHistoryRepository;
        this.http = http;
        this.userService = userService;
    }
    async sendPush(target, notification) {
        const message = { notification };
        if ((0, lodash_1.get)(target, 'topic', '')) {
            message['topic'] = target['topic'];
        }
        else {
            message['token'] = target['token'];
        }
        let response;
        try {
            response = await this.sendFcmMessage({ message });
        }
        catch (error) {
            response = error.response;
        }
        return response;
    }
    async historySave(response, userInfo) {
        const data = JSON.parse(response.config.data);
        const push_history_data = {
            status: '' + response.status,
            topic: (0, lodash_1.get)(data, ['message', 'topic'], ''),
            token: (0, lodash_1.get)(data, ['message', 'token'], ''),
            title: (0, lodash_1.get)(data, ['message', 'notification', 'title'], ''),
            content: (0, lodash_1.get)(data, ['message', 'notification', 'body'], ''),
            data: (0, lodash_1.get)(data, ['message', 'data'], '') && JSON.stringify((0, lodash_1.get)(data, ['message', 'data'])),
            notifications: response.config.data,
            error: (0, lodash_1.get)(response, ['data', 'error'], '') && JSON.stringify((0, lodash_1.get)(response, ['data', 'error'])),
        };
        if ((0, lodash_1.get)(userInfo, 'idx', '')) {
            push_history_data['userIdx'] = userInfo['idx'];
        }
        const pushHistory = await this.pushHistoryRepository.create(push_history_data);
        return await this.pushHistoryRepository.save(pushHistory);
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
    async create(createPushNotificationDto) {
        if (!createPushNotificationDto.topic && !createPushNotificationDto.userIdx) {
            throw new common_1.UnprocessableEntityException('push-notification.service.create: 처리 할 수 없습니다.');
        }
        const message = {
            token: '',
            topic: '',
        };
        const notifications = {
            title: createPushNotificationDto.title,
            body: '',
        };
        if (createPushNotificationDto.topic) {
            message['topic'] = createPushNotificationDto.topic;
            delete message['token'];
        }
        let userInfo;
        if (createPushNotificationDto.userIdx) {
            userInfo = await this.userService.findIdx(+createPushNotificationDto.userIdx);
            message['token'] = userInfo.device.token;
            delete message['topic'];
        }
        if (createPushNotificationDto.content) {
            notifications['body'] = createPushNotificationDto.content;
        }
        message['notification'] = notifications;
        let response;
        try {
            response = await this.sendFcmMessage({ message });
        }
        catch (error) {
            response = error.response;
        }
        const pushHistory = await this.historySave(response, userInfo);
        return { pushHistory };
    }
    async findAll(options, search, order, userInfo) {
        const { take, page } = options;
        let user;
        if ((0, lodash_1.get)(userInfo, 'id', '')) {
            user = await this.userService.findId((0, lodash_1.get)(userInfo, 'id'));
        }
        const where = common_utils_1.commonUtils.searchSplit(search);
        const topic = ['all', 'marketing'];
        where['status'] = (0, lodash_1.get)(where, 'status', registrationStatus);
        const alias = 'push';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.pushHistoryRepository.createQueryBuilder('push')
            .where(qb => {
            qb.where('`push`.`status` IN (:status)', { status: (0, lodash_1.isArray)(where['status']) ? where['status'] : [where['status']] });
            qb.andWhere('(`push`.`userIdx` = :userIdx'
                + ' OR `push`.`topic` IN (:topic))', {
                userIdx: (0, lodash_1.get)(user, 'idx', ''),
                topic: topic
            });
        })
            .orderBy(order_by)
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data };
    }
    async adminFindAll(options, search, order) {
        const { take, page } = options;
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['year'] = (0, lodash_1.get)(where, 'year', moment().format('YYYY'));
        where['month'] = (0, lodash_1.get)(where, 'month', moment().format('MM'));
        const alias = 'push';
        let order_by = common_utils_1.commonUtils.orderSplit(order, alias);
        order_by[alias + '.createdAt'] = (0, lodash_1.get)(order_by, alias + '.createdAt', 'DESC');
        const [results, total] = await this.pushHistoryRepository.createQueryBuilder('push')
            .where(qb => {
            qb.where('`push`.`createdAt` >= :min_createdAt', { min_createdAt: where['year'] + '-' + where['month'] + '-01' });
            qb.andWhere('`push`.`createdAt` <= :max_createdAt', { max_createdAt: where['year'] + '-' + where['month'] + '-31' });
        })
            .orderBy(order_by)
            .skip((take * (page - 1) || 0))
            .take((take || 10))
            .getManyAndCount();
        const data = new paginate_1.Pagination({
            results,
            total,
            page,
        });
        return { data };
    }
    async findOne(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('push-notification.service.findOne: 처리 할 수 없습니다.');
        }
        const pushHistory = await this.pushHistoryRepository.findOne({
            where: { idx: idx }
        });
        if (!(0, lodash_1.get)(pushHistory, 'idx', '')) {
            throw new common_1.NotFoundException('push-notification.service.findOne: 조회된 데이터가 없습니다.');
        }
        return pushHistory;
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
        if (isApp && hostUser['device']['notification'] == notificationStatus) {
            const target = {
                token: hostUser['device']['token'],
            };
            const notifications = {
                title: '바로결제 완료',
                body: po['product']['title'] + ' ' + po['title'] + ' 결제가 완료되었습니다.',
            };
            const response = await this.sendPush(target, notifications);
            await this.historySave(response, hostUser);
        }
    }
    async guestOrderCancelPush(hostUser, po) {
        const isApp = await this.isApp((0, lodash_1.get)(hostUser, ['device']));
        if (isApp && hostUser['device']['notification'] == notificationStatus) {
            const target = {
                token: hostUser['device']['token'],
            };
            const notifications = {
                title: '바로결제 취소',
                body: po['product']['title'] + ' ' + po['title'] + '결제를 게스트가 취소했습니다.',
            };
            const response = await this.sendPush(target, notifications);
            await this.historySave(response, hostUser);
        }
    }
    async hostOrderCancelPush(guestUser, order) {
        const isApp = await this.isApp((0, lodash_1.get)(guestUser, ['device']));
        if (isApp && guestUser['device']['notification'] == notificationStatus) {
            const lang = common_utils_1.commonUtils.langValue(guestUser.language);
            const target = {
                token: guestUser['device']['token'],
            };
            const notifications = {
                title: common_language_1.commonLanguage['바로결제 거절'][lang],
                body: order['orderProduct']['productOption']['product']['title' + lang]
                    + ' ' + order['orderProduct']['productOption']['title' + lang] + ' ' + common_language_1.commonLanguage['결제를 호스트가 거절했습니다.'][lang],
            };
            const response = await this.sendPush(target, notifications);
            await this.historySave(response, guestUser);
        }
    }
    async hostOrderApprovalPush(guestUser, order) {
        const isApp = await this.isApp((0, lodash_1.get)(guestUser, ['device']));
        if (isApp && guestUser['device']['notification'] == notificationStatus) {
            const lang = common_utils_1.commonUtils.langValue(guestUser.language);
            const target = {
                token: guestUser['device']['token'],
            };
            const notifications = {
                title: common_language_1.commonLanguage['바로결제 승인'][lang],
                body: order['orderProduct']['productOption']['product']['title' + lang]
                    + ' ' + order['orderProduct']['productOption']['title' + lang] + ' ' + common_language_1.commonLanguage['결제를 호스트가 승인했습니다'][lang],
            };
            const response = await this.sendPush(target, notifications);
            await this.historySave(response, guestUser);
        }
    }
    async guestReservationPush(hostUser, po) {
        const isApp = await this.isApp((0, lodash_1.get)(hostUser, ['device']));
        if (isApp && hostUser['device']['notification'] == notificationStatus) {
            const target = {
                token: hostUser['device']['token'],
            };
            const notifications = {
                title: '방문예약 신청',
                body: po['product']['title'] + ' ' + po['title'] + ' 방문예약이 신청되었습니다.',
            };
            const response = await this.sendPush(target, notifications);
            console.log({ response });
            await this.historySave(response, hostUser);
        }
    }
    async guestReservationCancelPush(hostUser, reservation) {
        const isApp = await this.isApp((0, lodash_1.get)(hostUser, ['device']));
        if (isApp && hostUser['device']['notification'] == notificationStatus) {
            const target = {
                token: hostUser['device']['token'],
            };
            const notifications = {
                title: '방문예약 취소',
                body: reservation['productOption']['product']['title']
                    + ' '
                    + reservation['productOption']['title']
                    + ' 방문예약을 게스트가 취소했습니다.',
            };
            const response = await this.sendPush(target, notifications);
            await this.historySave(response, hostUser);
        }
    }
    async guestReservationConfirmationPush(hostUser, reservation) {
        const isApp = await this.isApp((0, lodash_1.get)(hostUser, ['device']));
        if (isApp && hostUser['device']['notification'] == notificationStatus) {
            const target = {
                token: hostUser['device']['token'],
            };
            const notifications = {
                title: '방문예약 확정',
                body: reservation['productOption']['product']['title']
                    + ' '
                    + reservation['productOption']['title']
                    + ' 방문예약을 게스트가 확정했습니다.',
            };
            const response = await this.sendPush(target, notifications);
            await this.historySave(response, hostUser);
        }
    }
    async hostReservationCancelPush(guestUser, reservation) {
        const isApp = await this.isApp((0, lodash_1.get)(guestUser, ['device']));
        if (isApp && guestUser['device']['notification'] == notificationStatus) {
            const lang = common_utils_1.commonUtils.langValue(guestUser.language);
            const target = {
                token: guestUser['device']['token'],
            };
            const notifications = {
                title: common_language_1.commonLanguage['방문예약 거절'][lang],
                body: reservation['productOption']['product']['title' + lang]
                    + ' '
                    + reservation['productOption']['title' + lang]
                    + ' ' + common_language_1.commonLanguage['방문예약을 호스트가 거절했습니다'][lang],
            };
            const response = await this.sendPush(target, notifications);
            await this.historySave(response, guestUser);
        }
    }
    async hostReservationApprovalPush(guestUser, reservation) {
        const isApp = await this.isApp((0, lodash_1.get)(guestUser, ['device']));
        if (isApp && guestUser['device']['notification'] == notificationStatus) {
            const lang = common_utils_1.commonUtils.langValue(guestUser.language);
            const target = {
                token: guestUser['device']['token'],
            };
            const notifications = {
                title: common_language_1.commonLanguage['방문예약 승인'][lang],
                body: reservation['productOption']['product']['title']
                    + ' '
                    + reservation['productOption']['title']
                    + ' ' + common_language_1.commonLanguage['방문예약을 호스트가 승인했습니다'][lang],
            };
            const response = await this.sendPush(target, notifications);
            await this.historySave(response, guestUser);
        }
    }
    async adminReservationStatusChange(guestUser, hostUser, reservation) {
        const target = {};
        const guestIsApp = await this.isApp((0, lodash_1.get)(guestUser, ['device']));
        if (guestIsApp && guestUser['device']['notification'] == notificationStatus) {
            const lang = common_utils_1.commonUtils.langValue(guestUser.language);
            const notifications = {
                title: common_language_1.commonLanguage['방문예약 변경'][lang],
                body: reservation['productOption']['product']['title' + lang]
                    + ' '
                    + reservation['productOption']['title' + lang]
                    + ' '
                    + common_language_1.commonLanguage['방문예약을 관리자가 변경했습니다'][lang],
            };
            target['token'] = guestUser['device']['token'];
            const response = await this.sendPush(target, notifications);
            await this.historySave(response, guestUser);
        }
        const hostIsApp = await this.isApp((0, lodash_1.get)(hostUser, ['device']));
        if (hostIsApp && hostUser['device']['notification'] == notificationStatus) {
            target['token'] = hostUser['device']['token'];
            const notifications = {
                title: '방문예약 변경',
                body: reservation['productOption']['product']['title']
                    + ' '
                    + reservation['productOption']['title']
                    + ' 방문예약을 관리자가 변경했습니다.',
            };
            const response = await this.sendPush(target, notifications);
            await this.historySave(response, hostUser);
        }
    }
};
PushNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(push_history_entity_1.PushHistoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        dist_1.HttpService,
        users_service_1.UsersService])
], PushNotificationService);
exports.PushNotificationService = PushNotificationService;
//# sourceMappingURL=push-notification.service.js.map