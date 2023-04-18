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
exports.MessageService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const rxjs_1 = require("rxjs");
const common_utils_1 = require("../common/common.utils");
const settings_service_1 = require("../settings/settings.service");
const typeorm_2 = require("typeorm");
const message_history_entity_1 = require("./entities/message-history.entity");
const message_type_entity_1 = require("./entities/message-type.entity");
const message_entity_1 = require("./entities/message.entity");
const schedule_1 = require("@nestjs/schedule");
const moment = require("moment");
const uncertifiedStatus = 1;
const registrationStatus = 2;
const bizmHost = 'https://alimtalk-api.bizmsg.kr';
const bizmUrl = {
    send: '/v2/sender/send',
    lookup: '/v2/template',
    status: '/v2/sender/report'
};
let MessageService = class MessageService {
    constructor(messageRepository, messageTypeRepository, messageHistoryRepository, settingsService, http) {
        this.messageRepository = messageRepository;
        this.messageTypeRepository = messageTypeRepository;
        this.messageHistoryRepository = messageHistoryRepository;
        this.settingsService = settingsService;
        this.http = http;
    }
    async send(phone, type, data, reserveDt) {
        const { profileKey, bizmId, adminNumber, senderNumber, } = await this.bizmInfo();
        const site_settings = await this.settingsService.find('site');
        const siteTitle = site_settings['site_title'].set_value;
        const message = await this.messageFindType(type);
        const msgContent = {};
        let msg_button = [];
        if ((0, lodash_1.get)(message, ['sms'], '')) {
            msgContent['sms'] = this.replaceMessage(message['sms'].tmpl, data);
        }
        if ((0, lodash_1.get)(message, ['alimtalk'], '')) {
            msgContent['alimtalk'] = this.replaceMessage(message['alimtalk'].tmpl, data);
            msg_button = (0, lodash_1.get)(message, ['alimtalk', 'button']) ? JSON.parse(message['alimtalk'].button) : [];
        }
        const sendType = (0, lodash_1.get)(msgContent, ['alimtalk'], '') ? 'alimtalk' : 'sms';
        const msg = msgContent[sendType];
        const datas = [];
        if (msg) {
            for (const key in phone) {
                const send_data = {
                    message_type: 'at',
                    phn: phone[key],
                    profile: profileKey,
                    reserveDt: reserveDt ? reserveDt : '00000000000000',
                    msg: msg,
                    tmplId: sendType == 'alimtalk' ? message['alimtalk'].code : null,
                    smsOnly: sendType == 'sms' ? 'Y' : 'N',
                    smsKind: 'L',
                    msgSms: msg,
                    smsSender: senderNumber,
                    smsLmsTit: siteTitle,
                };
                if (msg_button.length > 0) {
                    for (const k in msg_button) {
                        const button = {};
                        if ((0, lodash_1.get)(msg_button, [k, 'name'], '')) {
                            button['name'] = msg_button[k].name;
                        }
                        if ((0, lodash_1.get)(msg_button, [k, 'linkType'], '')) {
                            button['type'] = msg_button[k].linkType;
                        }
                        if ((0, lodash_1.get)(msg_button, [k, 'linkMo'], '')) {
                            button['url_mobile'] = msg_button[k].linkMo;
                        }
                        if ((0, lodash_1.get)(msg_button, [k, 'linkPc'], '')) {
                            button['url_pc'] = msg_button[k].linkPc;
                        }
                        if ((0, lodash_1.get)(msg_button, [k, 'linkIos'], '')) {
                            button['scheme_ios'] = msg_button[k].linkIos;
                        }
                        if ((0, lodash_1.get)(msg_button, [k, 'linkAnd'], '')) {
                            button['scheme_android'] = msg_button[k].linkAnd;
                        }
                        send_data['button' + msg_button[k].ordering] = button;
                    }
                }
                datas.push(send_data);
            }
        }
        if (datas.length > 0) {
            const http = this.http;
            const url = bizmHost + bizmUrl.send;
            const headersRequest = {
                'Content-Type': 'application/json',
                userId: bizmId
            };
            const response = await (0, rxjs_1.firstValueFrom)(http.post(url, JSON.stringify(datas), {
                headers: headersRequest,
            }));
            const history_data = {
                type: type,
                templateCode: sendType == 'alimtalk' ? message['alimtalk'].code : '',
            };
            for (const key in response.data) {
                await this.historySave(response.data[key], history_data, datas[key]);
            }
        }
    }
    async bizmInfo() {
        const alimtalk_settings = await this.settingsService.find('alimtalk');
        const profileKey = alimtalk_settings['alimtalk_key'].set_value;
        const bizmId = alimtalk_settings['alimtalk_id'].set_value;
        const adminNumber = alimtalk_settings['alimtalk_admin_mobile'].set_value;
        const senderNumber = alimtalk_settings['alimtalk_sender_number'].set_value;
        return {
            profileKey,
            bizmId,
            adminNumber,
            senderNumber,
        };
    }
    async historySave(res, history_data, datas) {
        const res_code = res.message.split(':');
        history_data['req'] = JSON.stringify(datas);
        history_data['res'] = JSON.stringify(res);
        history_data['resType'] = res.data.type;
        history_data['resCode'] = res_code[0];
        const messageHistoryEntity = await this.messageHistoryRepository.create(history_data);
        await this.messageHistoryRepository.save(messageHistoryEntity);
    }
    replaceMessage(template, data) {
        const originTxt = {
            shop: "#{쇼핑몰이름}",
            name_order: "#{주문자명}",
            user_name: "#{회원명}",
            ord_code: "#{주문번호}",
            ord_bank: "#{은행명}",
            ord_depositer: "#{예금주}",
            ord_account: "#{계좌번호}",
            total_pay_price: "#{결제금액}",
            ordp_title: "#{상품명}",
            parcel_company: "#{택배사}",
            ordpc_parcel_num: "#{송장번호}",
            parcel_trace: "#{배송조회링크}",
            end_date: "#{만료일}",
            point: "#{적립금}",
            coupon: "#{쿠폰}",
            user_group: "#{등급}"
        };
        let message = template;
        for (const key in originTxt) {
            if ((0, lodash_1.get)(data, [key], '')) {
                const reg = new RegExp(originTxt[key], 'g');
                message = message.replace(reg, data[key]);
            }
        }
        return message;
    }
    create(createMessageDto) {
        return 'This action adds a new message';
    }
    async messageFindAll(search) {
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', [uncertifiedStatus, registrationStatus]);
        const message = await this.messageRepository.find({
            where: qb => {
                qb.where('status IN (:status)', { status: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'status')) ? where['status'] : [where['status']] });
                (0, lodash_1.get)(where, 'group', '') && qb.andWhere('group IN (:group)', { group: (0, lodash_1.get)(where, 'group') });
                (0, lodash_1.get)(where, 'type', '') && qb.andWhere('type IN (:type)', { type: (0, lodash_1.get)(where, 'type') });
                (0, lodash_1.get)(where, 'sendtype', '') && qb.andWhere('sendtype IN (:sendtype)', { sendtype: (0, lodash_1.get)(where, 'sendtype') });
                (0, lodash_1.get)(where, 'code', '') && qb.andWhere('code IN (:code)', { code: (0, lodash_1.get)(where, 'code') });
            }
        });
        return common_utils_1.commonUtils.getArrayKey(message, ['sendtype', 'group'], true);
    }
    async messageFindOne(code) {
        const messageInfo = await this.findOneCode(code);
        const { profileKey, bizmId, } = await this.bizmInfo();
        const http = this.http;
        const url = bizmHost + bizmUrl.lookup + '?senderKey=' + profileKey + '&templateCode=' + messageInfo.code;
        const headersRequest = {
            'Content-Type': 'application/json',
            userId: bizmId
        };
        const response = await (0, rxjs_1.firstValueFrom)(http.get(url, { headers: headersRequest }));
        const result = {};
        if (response.data.code == 'success') {
            const { data } = response.data;
            if (data.inspectionStatus == 'APR') {
                result['code'] = data.templateCode;
                result['template'] = data.templateContent;
            }
            else {
                throw new common_1.NotFoundException('message.service.messageFindOne: '
                    + '검수상태가 승인인 템플릿 코드만 등록 가능합니다.<br>'
                    + '비즈엠>템플릿 목록>템플릿 상세 정보를 확인해주세요.');
            }
        }
        else {
            throw new common_1.NotFoundException('message.service.messageFindOne: ' + response.data.message);
        }
        return { result };
    }
    async messageHistoryFindAll(year, month) {
        const ymdate = year + '-' + month;
        const where = {
            min_createdAt: moment(ymdate).format('YYYY-MM-01'),
            max_createdAt: moment(ymdate).format('YYYY-MM-31'),
        };
        const messageHistory = await this.messageHistoryRepository.createQueryBuilder()
            .select('resType')
            .addSelect("DATE_FORMAT(createdAt, '%Y-%m-%d')", 'date')
            .addSelect("SUM( if( resCode = 'K000' OR resCode = 'M000', 1, 0) )", 'suc_cnt')
            .addSelect("COUNT(`idx`)", 'total_cnt')
            .where(qb => {
            qb.where('createdAt >= :min_createdAt', { min_createdAt: where['min_createdAt'] });
            qb.andWhere('createdAt <= :max_createdAt', { max_createdAt: where['max_createdAt'] });
        })
            .groupBy('resType')
            .addGroupBy("DATE_FORMAT(createdAt, '%Y-%m-%d')")
            .execute();
        console.log({ messageHistory });
        return common_utils_1.commonUtils.getArrayKey(messageHistory, ['date'], true);
    }
    async messageFindType(typeStr) {
        if (!typeStr) {
            throw new common_1.NotFoundException('message.service.messageFindType: 조회할 정보가 없습니다.');
        }
        const typeArr = typeStr.split('_');
        const group = typeArr[0];
        const type = typeArr[1];
        const message = await this.messageRepository.find({
            where: qb => {
                qb.where('`status` IN (:status)', { status: [registrationStatus] });
                qb.andWhere('`group` IN (:group)', { group: [group] });
                qb.andWhere('`type` IN (:type)', { type: [type] });
            },
            order: { idx: 'ASC' }
        });
        if (message.length <= 0) {
            throw new common_1.NotFoundException('message.service.messageFindType: 조회된 정보가 없습니다.');
        }
        return common_utils_1.commonUtils.getArrayKey(message, ['sendtype'], false);
    }
    async messageTypeFindAll() {
        return await this.messageTypeRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} message`;
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('message.service.findOneIdx: 잘못된 정보 입니다.');
        }
        const message = await this.messageRepository.findOne({
            where: { idx: idx },
        });
        if (!(0, lodash_1.get)(message, 'idx', '')) {
            throw new common_1.NotFoundException('message.service.findOneIdx: 정보를 찾을 수 없습니다.');
        }
        return message;
    }
    async findOneCode(code) {
        if (!code) {
            throw new common_1.NotFoundException('message.service.findOneCode: 잘못된 정보 입니다.');
        }
        const message = await this.messageRepository.findOne({
            where: { code: code, sendtype: 'alimtalk' },
        });
        if (!(0, lodash_1.get)(message, 'idx', '')) {
            throw new common_1.NotFoundException('message.service.findOneCode: 정보를 찾을 수 없습니다.');
        }
        return message;
    }
    async update(idx, code, status, tmpl) {
        if (!status && !tmpl && !code) {
            throw new common_1.NotFoundException('message.service.update: 수정할 정보가 없습니다.');
        }
        const set = {};
        if (status)
            set['status'] = status;
        if (tmpl)
            set['tmpl'] = tmpl;
        if (code)
            set['code'] = code;
        await this.messageRepository.createQueryBuilder()
            .update()
            .set(set)
            .where({ idx: idx })
            .execute();
    }
    remove(id) {
        return `This action removes a #${id} message`;
    }
    async messageStatusChange() {
        console.log('[cron] messageStatusChange: ', moment().format('YYYY-MM-DD HH:mm:ss'));
        const messageHistory = await this.messageHistoryRepository.find({
            where: { resCode: 'M001' }
        });
        console.log('상태 변경할 메시지 개수: ', messageHistory.length);
        if (messageHistory.length > 0) {
            const http = this.http;
            const { profileKey, bizmId, } = await this.bizmInfo();
            const headersRequest = {
                userId: bizmId
            };
            for (const key in messageHistory) {
                const res = JSON.parse(messageHistory[key].res);
                const url = bizmHost + bizmUrl.status + '?profile=' + profileKey + '&msgid=' + res.data.msgid;
                const response = await (0, rxjs_1.firstValueFrom)(http.get(url, { headers: headersRequest }));
                if (response.data.message != messageHistory[key].resCode) {
                    await this.messageHistoryRepository.update(messageHistory[key].idx, {
                        resCode: response.data.message
                    });
                }
            }
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('0 30 1 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageService.prototype, "messageStatusChange", null);
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.MessageEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(message_type_entity_1.MessageTypeEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(message_history_entity_1.MessageHistoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        settings_service_1.SettingsService,
        axios_1.HttpService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map