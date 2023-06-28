import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isArray } from 'lodash';
import { catchError, firstValueFrom } from 'rxjs';
import { commonUtils } from 'src/common/common.utils';
import { SettingsService } from 'src/settings/settings.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageHistoryEntity } from './entities/message-history.entity';
import { MessageTypeEntity } from './entities/message-type.entity';
import { MessageEntity } from './entities/message.entity';
import { Cron } from '@nestjs/schedule';

import * as moment from 'moment';

const uncertifiedStatus = 1;
const registrationStatus = 2;
// 개발서버
// const bizmHost = 'https://dev-alimtalk-api.bizmsg.kr:1443';
const bizmHost = 'https://alimtalk-api.bizmsg.kr';
const bizmUrl = {
  send: '/v2/sender/send',
  lookup: '/v2/template',
  status: '/v2/sender/report'
}

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>,
    @InjectRepository(MessageTypeEntity) private messageTypeRepository: Repository<MessageTypeEntity>,
    @InjectRepository(MessageHistoryEntity) private messageHistoryRepository: Repository<MessageHistoryEntity>,
    private readonly settingsService: SettingsService,
    private readonly http: HttpService,
  ) { }

  // 메시지 발송
  // reserveDt 메시지 예약발송을 위한 시간 (ex 20230101100000 2023년01월01일 10시 00분 00초)
  async send(phone: string[], type: string, data?, reserveDt?: string) {
    // 비즈엠 정보 가져오기
    const {
      profileKey,
      bizmId,
      adminNumber,
      senderNumber,
    } = await this.bizmInfo();
    const site_settings = await this.settingsService.find('site');
    const siteTitle = site_settings['site_title'].set_value;

    // 메시지 정보 가져오기
    const message = await this.messageFindType(type);

    // 메시지 내용 치환
    const msgContent = {};
    let msg_button = [];
    if (get(message, ['sms'], '')) {
      msgContent['sms'] = this.replaceMessage(message['sms'].tmpl, data);
    }
    if (get(message, ['alimtalk'], '')) {
      msgContent['alimtalk'] = this.replaceMessage(message['alimtalk'].tmpl, data);
      msg_button = get(message, ['alimtalk', 'button']) ? JSON.parse(message['alimtalk'].button) : [];
    }

    const sendType = get(msgContent, ['alimtalk'], '') ? 'alimtalk' : 'sms';
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
          // smsSender: senderNumber,
          smsLmsTit: siteTitle,
        };

        // 버튼 설정
        if (msg_button.length > 0) {
          for (const k in msg_button) {
            const button = {};
            if (get(msg_button, [k, 'name'], '')) {
              button['name'] = msg_button[k].name
            }
            if (get(msg_button, [k, 'linkType'], '')) {
              button['type'] = msg_button[k].linkType
            }
            if (get(msg_button, [k, 'linkMo'], '')) {
              button['url_mobile'] = msg_button[k].linkMo
            }
            if (get(msg_button, [k, 'linkPc'], '')) {
              button['url_pc'] = msg_button[k].linkPc
            }
            if (get(msg_button, [k, 'linkIos'], '')) {
              button['scheme_ios'] = msg_button[k].linkIos
            }
            if (get(msg_button, [k, 'linkAnd'], '')) {
              button['scheme_android'] = msg_button[k].linkAnd
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
      // 메시지 발송
      const response = await firstValueFrom(
        http.post(url, JSON.stringify(datas), {
          headers: headersRequest,
        })
      );
      // 히스토리 기록
      const history_data = {
        type: type,
        templateCode: sendType == 'alimtalk' ? message['alimtalk'].code : '',
      };
      for (const key in response.data) {
        await this.historySave(response.data[key], history_data, datas[key]);
      }
    }
  }

  // 비즈엠 정보 가져오기
  async bizmInfo() {
    // const bizmId = 'prepay_user';
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

  // 메시지 발송 내역 히스토리에 기록
  async historySave(res, history_data, datas) {
    const res_code = res.message.split(':');
    history_data['req'] = JSON.stringify(datas);
    history_data['res'] = JSON.stringify(res);
    history_data['resType'] = res.data.type;
    history_data['resCode'] = res_code[0];
    const messageHistoryEntity = await this.messageHistoryRepository.create(history_data);
    await this.messageHistoryRepository.save(messageHistoryEntity);
  }

  // 메시지 내용 치환
  replaceMessage(template: string, data) {
    const originTxt = {
      // shop: "#{쇼핑몰이름}",
      // name_order: "#{주문자명}",
      // user_name: "#{회원명}",
      // ord_code: "#{주문번호}",
      // ord_bank: "#{은행명}",
      // ord_depositer: "#{예금주}",
      // ord_account: "#{계좌번호}",
      // total_pay_price: "#{결제금액}",
      // ordp_title: "#{상품명}",
      // parcel_company: "#{택배사}",
      // ordpc_parcel_num: "#{송장번호}",
      // parcel_trace: "#{배송조회링크}",
      // end_date: "#{만료일}",
      // point: "#{적립금}",
      // coupon: "#{쿠폰}",
      // user_group: "#{등급}",
      url: '#{사이트URL}',
      site_title: '#{회사명}',
      site_email: '#{관리자 이메일}',
      product_title: '#{숙소이름}',
      po_title: '#{방이름}',
      guest_name: '#{방문자명}',
      order_name: '#{신청인명}',
      visit_date: '#{방문날짜}',
      occupancy_date: '#{입주날짜}',
      eviction_date: '#{퇴거날짜}',
      contract_period: '#{계약기간}',
      phone: '#{연락처}',
      user_name: '#{회원이름}',
      user_id: '#{회원아이디}',
      dormant_date: '#{전환 예정일}',
      membership_month: '#{멤버십개월}',
      membership_price: '#{멤버십금액}',
      membership_bank: '#{은행명}',
      membership_account: '#{계좌번호}',
      membership_end_date: '#{멤버십종료일}',
      board_title: '#{게시판이름}',
      inquiry_content: '#{문의내용}',
      answer_content: '#{답변내용}',
      payment: '#{결제금액}',
      po_payment: '#{방금액}',
      tax: '#{부가세}',
      fee: '#{수수료}',
      cancel_reason_host: '#{거절사유}',
      cancel_reason_guest: '#{입주 거절 사유}',
      link: '#{링크}',
    };
    let message = template;
    for (const key in originTxt) {
      if (get(data, [key], '')) {
        const reg = new RegExp(originTxt[key], 'g');
        message = message.replace(reg, data[key])
      }
    }

    return message;
  }

  create(createMessageDto: CreateMessageDto) {
    return 'This action adds a new message';
  }

  async messageFindAll(search: string[]) {
    const where = commonUtils.searchSplit(search);
    where['status'] = get(where, 'status', [uncertifiedStatus, registrationStatus]);

    const message = await this.messageRepository.find({
      where: qb => {
        qb.where('status IN (:status)', { status: isArray(get(where, 'status')) ? where['status'] : [where['status']] })
        get(where, 'group', '') && qb.andWhere('group IN (:group)', { group: get(where, 'group') })
        get(where, 'type', '') && qb.andWhere('type IN (:type)', { type: get(where, 'type') })
        get(where, 'sendtype', '') && qb.andWhere('sendtype IN (:sendtype)', { sendtype: get(where, 'sendtype') })
        get(where, 'code', '') && qb.andWhere('code IN (:code)', { code: get(where, 'code') })
      }
    });

    return commonUtils.getArrayKey(message, ['sendtype', 'group'], true);
  }

  async messageFindOne(code: string) {
    const messageInfo = await this.findOneCode(code);

    // 비즈엠 정보 가져오기
    const {
      profileKey,
      bizmId,
    } = await this.bizmInfo();

    const http = this.http;
    const url = bizmHost + bizmUrl.lookup + '?senderKey=' + profileKey + '&templateCode=' + messageInfo.code;
    const headersRequest = {
      'Content-Type': 'application/json',
      userId: bizmId
    };
    const response = await firstValueFrom(
      http.get(url, { headers: headersRequest })
    );

    const result = {};
    if (response.data.code == 'success') {
      const { data } = response.data;
      if (data.inspectionStatus == 'APR') {
        result['code'] = data.templateCode;
        result['template'] = data.templateContent;
      } else {
        throw new NotFoundException(
          'message.service.messageFindOne: '
          + '검수상태가 승인인 템플릿 코드만 등록 가능합니다.<br>'
          + '비즈엠>템플릿 목록>템플릿 상세 정보를 확인해주세요.'
        );
      }
    } else {
      throw new NotFoundException('message.service.messageFindOne: ' + response.data.message);
    }

    return { result };
  }

  async messageHistoryFindAll(year: string, month: string) {
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
        qb.where('createdAt >= :min_createdAt', { min_createdAt: where['min_createdAt'] })
        qb.andWhere('createdAt <= :max_createdAt', { max_createdAt: where['max_createdAt'] })
      })
      .groupBy('resType')
      .addGroupBy("DATE_FORMAT(createdAt, '%Y-%m-%d')")
      .execute();
    console.log({ messageHistory });

    return commonUtils.getArrayKey(messageHistory, ['date'], true);
  }

  async messageFindType(typeStr: string) {
    if (!typeStr) {
      throw new NotFoundException('message.service.messageFindType: 조회할 정보가 없습니다.');
    }
    const typeArr = typeStr.split('_');
    const group = typeArr[0];
    const type = typeArr[1];
    const message = await this.messageRepository.find({
      where: qb => {
        qb.where('`status` IN (:status)', { status: [registrationStatus] })
        qb.andWhere('`group` IN (:group)', { group: [group] })
        qb.andWhere('`type` IN (:type)', { type: [type] })
      },
      order: { idx: 'ASC' }
    });
    if (message.length <= 0) {
      throw new NotFoundException('message.service.messageFindType: 조회된 정보가 없습니다.');
    }

    return commonUtils.getArrayKey(message, ['sendtype'], false);
  }

  async messageTypeFindAll() {
    return await this.messageTypeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('message.service.findOneIdx: 잘못된 정보 입니다.');
    }
    const message = await this.messageRepository.findOne({
      where: { idx: idx },
    });
    if (!get(message, 'idx', '')) {
      throw new NotFoundException('message.service.findOneIdx: 정보를 찾을 수 없습니다.');
    }
    return message;
  }

  async findOneCode(code: string) {
    if (!code) {
      throw new NotFoundException('message.service.findOneCode: 잘못된 정보 입니다.');
    }
    const message = await this.messageRepository.findOne({
      where: { code: code, sendtype: 'alimtalk' },
    });
    if (!get(message, 'idx', '')) {
      throw new NotFoundException('message.service.findOneCode: 정보를 찾을 수 없습니다.');
    }
    return message;
  }

  async update(idx: number, code: string, status?: string, tmpl?: string) {
    if (!status && !tmpl && !code) {
      throw new NotFoundException('message.service.update: 수정할 정보가 없습니다.');
    }
    const set = {};
    if (status) set['status'] = status;
    if (tmpl) set['tmpl'] = tmpl;
    if (code) set['code'] = code;
    await this.messageRepository.createQueryBuilder()
      .update()
      .set(set)
      .where({ idx: idx })
      .execute();
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  /******************** cron ********************/
  // 메시지 상태 변경
  @Cron('0 30 1 * * *')
  async messageStatusChange() {
    console.log('[cron] messageStatusChange: ', moment().format('YYYY-MM-DD HH:mm:ss'));
    const messageHistory = await this.messageHistoryRepository.find({
      where: { resCode: 'M001' }
    });
    console.log('상태 변경할 메시지 개수: ', messageHistory.length);
    if (messageHistory.length > 0) {
      const http = this.http;
      // 비즈엠 정보 가져오기
      const {
        profileKey,
        bizmId,
      } = await this.bizmInfo();
      const headersRequest = {
        userId: bizmId
      };
      for (const key in messageHistory) {
        const res = JSON.parse(messageHistory[key].res);
        const url = bizmHost + bizmUrl.status + '?profile=' + profileKey + '&msgid=' + res.data.msgid;
        const response = await firstValueFrom(
          http.get(url, { headers: headersRequest })
        );
        if (response.data.message != messageHistory[key].resCode) {
          await this.messageHistoryRepository.update(messageHistory[key].idx, {
            resCode: response.data.message
          })
        }
      }
    }
  }
}
