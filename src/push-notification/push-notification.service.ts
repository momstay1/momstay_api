import { HttpService } from '@nestjs/axios/dist';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';
import { google } from 'googleapis';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { PushHistoryEntity } from './entities/push-history.entity';
import { Repository } from 'typeorm';
import { get, isArray, isEmpty } from 'lodash';
import { ProductOptionEntity } from 'src/product-option/entities/product-option.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ReservationEntity } from 'src/reservation/entities/reservation.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import { DeviceEntity } from 'src/device/entities/device.entity';
import { Pagination, PaginationOptions } from 'src/paginate';
import { commonUtils } from 'src/common/common.utils';
import { UsersService } from 'src/users/users.service';
import { commonLanguage } from 'src/common/common.language';
import * as moment from 'moment';

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const MESSAGING_URL = 'https://fcm.googleapis.com/v1/projects/momstay-50e27/messages:send';
let accessToken;
const registrationStatus = '200';
const notificationStatus = '2'; // 알림 동의
@Injectable()
export class PushNotificationService {
  constructor(
    @InjectRepository(PushHistoryEntity) private pushHistoryRepository: Repository<PushHistoryEntity>,
    private readonly http: HttpService,
    private readonly userService: UsersService,
  ) { }

  async sendPush(target, notification) {
    const message = { notification };
    if (get(target, 'topic', '')) {
      message['topic'] = target['topic'];
    } else {
      message['token'] = target['token'];
    }
    let response;
    try {
      response = await this.sendFcmMessage({ message });
    } catch (error) {
      response = error.response;
    }
    return response;
  }

  async historySave(response, userInfo?: UsersEntity) {
    const data = JSON.parse(response.config.data);
    const push_history_data = {
      status: '' + response.status,
      topic: get(data, ['message', 'topic'], ''),
      token: get(data, ['message', 'token'], ''),
      title: get(data, ['message', 'notification', 'title'], ''),
      content: get(data, ['message', 'notification', 'body'], ''),
      data: get(data, ['message', 'data'], '') && JSON.stringify(get(data, ['message', 'data'])),
      notifications: response.config.data,
      error: get(response, ['data', 'error'], '') && JSON.stringify(get(response, ['data', 'error'])),
    };
    if (get(userInfo, 'idx', '')) {
      push_history_data['userIdx'] = userInfo['idx'];
    }
    const pushHistory = await this.pushHistoryRepository.create(push_history_data);
    return await this.pushHistoryRepository.save(pushHistory);
  }

  private async sendFcmMessage(fcmMessage) {
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
    const response = await firstValueFrom(
      http.post(url, JSON.stringify(fcmMessage), {
        headers: headersRequest,
      })
    );
    return response;
  }

  private async getAccessToken() {
    const configService = new ConfigService(process.env);
    const firebaseConfig = configService.getFireBaseConfig();
    const jwtClient = new google.auth.JWT(
      firebaseConfig.firebase_client_email,
      null,
      firebaseConfig.firebase_private_key.replace(/\\n/gm, '\n'),
      [MESSAGING_SCOPE],
      null,
    )
    const tokens = await jwtClient.authorize();
    return tokens.access_token;
  }

  async create(createPushNotificationDto: CreatePushNotificationDto) {
    if (!createPushNotificationDto.topic && !createPushNotificationDto.userIdx) {
      throw new UnprocessableEntityException('push-notification.service.create: 처리 할 수 없습니다.');
    }
    const message = {
      token: '',
      topic: '',
    }
    const notifications = {
      title: createPushNotificationDto.title,
      body: '',
      // data: {}
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
    } catch (error) {
      response = error.response;
    }

    const pushHistory = await this.historySave(response, userInfo);

    return { pushHistory };
  }

  async findAll(options: PaginationOptions, search: string[], order: string, userInfo?: UsersEntity) {
    const { take, page } = options;

    let user;
    if (get(userInfo, 'id', '')) {
      // 회원 정보 가져오기
      user = await this.userService.findId(get(userInfo, 'id'));
    }

    const where = commonUtils.searchSplit(search);
    const topic = ['all', 'marketing'];

    where['status'] = get(where, 'status', registrationStatus);

    const alias = 'push';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');

    const [results, total] = await this.pushHistoryRepository.createQueryBuilder('push')
      .where(qb => {
        qb.where('`push`.`status` IN (:status)', { status: isArray(where['status']) ? where['status'] : [where['status']] })
        qb.andWhere(
          '(`push`.`userIdx` = :userIdx'
          + ' OR `push`.`topic` IN (:topic))'
          ,
          {
            userIdx: get(user, 'idx', ''),
            topic: topic
          }
        )
      })
      .orderBy(order_by)
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data };
  }

  async adminFindAll(options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    where['year'] = get(where, 'year', moment().format('YYYY'))
    where['month'] = get(where, 'month', moment().format('MM'))

    const alias = 'push';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');

    const [results, total] = await this.pushHistoryRepository.createQueryBuilder('push')
      .where(qb => {
        qb.where('`push`.`createdAt` >= :min_createdAt', { min_createdAt: where['year'] + '-' + where['month'] + '-01' })
        qb.andWhere('`push`.`createdAt` <= :max_createdAt', { max_createdAt: where['year'] + '-' + where['month'] + '-31' })
      })
      .orderBy(order_by)
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data };
  }

  async findOne(idx: number) {
    if (!idx) {
      throw new NotFoundException('push-notification.service.findOne: 처리 할 수 없습니다.');
    }
    const pushHistory = await this.pushHistoryRepository.findOne({
      where: { idx: idx }
    });
    if (!get(pushHistory, 'idx', '')) {
      throw new NotFoundException('push-notification.service.findOne: 조회된 데이터가 없습니다.');
    }

    return pushHistory;
  }

  update(id: number, updatePushNotificationDto: UpdatePushNotificationDto) {
    return `This action updates a #${id} pushNotification`;
  }

  remove(id: number) {
    return `This action removes a #${id} pushNotification`;
  }

  async isApp(device: DeviceEntity) {
    return ['android', 'ios'].includes(get(device, 'environment', 'web'));
  }

  // 게스트 방 결제 완료시 호스트에게 push 발송
  async guestOrderPush(hostUser: UsersEntity, po: ProductOptionEntity) {
    const isApp = await this.isApp(get(hostUser, ['device']));
    if (isApp && hostUser['device']['notification'] == notificationStatus) {
      const target = {
        token: hostUser['device']['token'],
      }
      const notifications = {
        title: '바로결제 완료',
        body: po['product']['title'] + ' ' + po['title'] + ' 결제가 완료되었습니다.',
      };
      const response = await this.sendPush(target, notifications);
      await this.historySave(response, hostUser);
    }
  }
  // 게스트 방 결제 취소시 호스트에게 push 발송
  async guestOrderCancelPush(hostUser: UsersEntity, po: ProductOptionEntity) {
    const isApp = await this.isApp(get(hostUser, ['device']));
    if (isApp && hostUser['device']['notification'] == notificationStatus) {
      const target = {
        token: hostUser['device']['token'],
      }
      const notifications = {
        title: '바로결제 취소',
        body: po['product']['title'] + ' ' + po['title'] + '결제를 게스트가 취소했습니다.',
      };
      const response = await this.sendPush(target, notifications);
      await this.historySave(response, hostUser);
    }
  }
  // 호스트가 방 결제 거절시 게스트에게 push 발송
  async hostOrderCancelPush(guestUser: UsersEntity, order: OrderEntity) {
    const isApp = await this.isApp(get(guestUser, ['device']));
    if (isApp && guestUser['device']['notification'] == notificationStatus) {
      const lang = commonUtils.langValue(guestUser.language);
      const target = {
        token: guestUser['device']['token'],
      }
      const notifications = {
        title: commonLanguage['바로결제 거절'][lang],
        body: order['orderProduct']['productOption']['product']['title' + lang]
          + ' ' + order['orderProduct']['productOption']['title' + lang] + ' ' + commonLanguage['결제를 호스트가 거절했습니다.'][lang],
      };
      const response = await this.sendPush(target, notifications);
      await this.historySave(response, guestUser);
    }
  }
  // 호스트가 방 결제 승인시 게스트에게 push 발송
  async hostOrderApprovalPush(guestUser: UsersEntity, order: OrderEntity) {
    const isApp = await this.isApp(get(guestUser, ['device']));
    if (isApp && guestUser['device']['notification'] == notificationStatus) {
      const lang = commonUtils.langValue(guestUser.language);
      const target = {
        token: guestUser['device']['token'],
      }
      const notifications = {
        title: commonLanguage['바로결제 승인'][lang],
        body: order['orderProduct']['productOption']['product']['title' + lang]
          + ' ' + order['orderProduct']['productOption']['title' + lang] + ' ' + commonLanguage['결제를 호스트가 승인했습니다'][lang],
      };
      const response = await this.sendPush(target, notifications);
      await this.historySave(response, guestUser);
    }
  }
  // 게스트 방문예약 신청시 호스트에게 push 발송
  async guestReservationPush(hostUser: UsersEntity, po: ProductOptionEntity) {
    const isApp = await this.isApp(get(hostUser, ['device']));
    if (isApp && hostUser['device']['notification'] == notificationStatus) {
      const target = {
        token: hostUser['device']['token'],
      }
      const notifications = {
        title: '방문예약 신청',
        body: po['product']['title'] + ' ' + po['title'] + ' 방문예약이 신청되었습니다.',
      };
      const response = await this.sendPush(target, notifications);
      console.log({ response });
      await this.historySave(response, hostUser);
    }
  }
  // 게스트 방문예약 취소시 호스트에게 push 발송
  async guestReservationCancelPush(hostUser: UsersEntity, reservation: ReservationEntity) {
    const isApp = await this.isApp(get(hostUser, ['device']));
    if (isApp && hostUser['device']['notification'] == notificationStatus) {
      const target = {
        token: hostUser['device']['token'],
      }
      const notifications = {
        title: '방문예약 취소',
        body:
          reservation['productOption']['product']['title']
          + ' '
          + reservation['productOption']['title']
          + ' 방문예약을 게스트가 취소했습니다.',
      };
      const response = await this.sendPush(target, notifications);
      await this.historySave(response, hostUser);
    }
  }
  // 게스트 방문예약 확정시 호스트에게 push 발송
  async guestReservationConfirmationPush(hostUser: UsersEntity, reservation: ReservationEntity) {
    const isApp = await this.isApp(get(hostUser, ['device']));
    if (isApp && hostUser['device']['notification'] == notificationStatus) {
      const target = {
        token: hostUser['device']['token'],
      }
      const notifications = {
        title: '방문예약 확정',
        body:
          reservation['productOption']['product']['title']
          + ' '
          + reservation['productOption']['title']
          + ' 방문예약을 게스트가 확정했습니다.',
      };
      const response = await this.sendPush(target, notifications);
      await this.historySave(response, hostUser);
    }
  }
  // 호스트가 방문에약 거절시 게스트에게 push 발송
  async hostReservationCancelPush(guestUser: UsersEntity, reservation: ReservationEntity) {
    const isApp = await this.isApp(get(guestUser, ['device']));
    if (isApp && guestUser['device']['notification'] == notificationStatus) {
      const lang = commonUtils.langValue(guestUser.language);
      const target = {
        token: guestUser['device']['token'],
      }
      const notifications = {
        title: commonLanguage['방문예약 거절'][lang],
        body: reservation['productOption']['product']['title' + lang]
          + ' '
          + reservation['productOption']['title' + lang]
          + ' ' + commonLanguage['방문예약을 호스트가 거절했습니다'][lang],
      };
      const response = await this.sendPush(target, notifications);
      await this.historySave(response, guestUser);
    }
  }
  // 호스트가 방문에약 승인시 게스트에게 push 발송
  async hostReservationApprovalPush(guestUser: UsersEntity, reservation: ReservationEntity) {
    const isApp = await this.isApp(get(guestUser, ['device']));
    if (isApp && guestUser['device']['notification'] == notificationStatus) {
      const lang = commonUtils.langValue(guestUser.language);
      const target = {
        token: guestUser['device']['token'],
      }
      const notifications = {
        title: commonLanguage['방문예약 승인'][lang],
        body: reservation['productOption']['product']['title']
          + ' '
          + reservation['productOption']['title']
          + ' ' + commonLanguage['방문예약을 호스트가 승인했습니다'][lang],
      };
      const response = await this.sendPush(target, notifications);
      await this.historySave(response, guestUser);
    }
  }
  // 관리자가 방문예약 일괄 상태 변경시 호스트 게스트에게 push 발송
  async adminReservationStatusChange(guestUser: UsersEntity, hostUser: UsersEntity, reservation: ReservationEntity) {

    const target = {};

    const guestIsApp = await this.isApp(get(guestUser, ['device']));
    if (guestIsApp && guestUser['device']['notification'] == notificationStatus) {
      const lang = commonUtils.langValue(guestUser.language);
      const notifications = {
        title: commonLanguage['방문예약 변경'][lang],
        body: reservation['productOption']['product']['title' + lang]
          + ' '
          + reservation['productOption']['title' + lang]
          + ' '
          + commonLanguage['방문예약을 관리자가 변경했습니다'][lang],
      };
      target['token'] = guestUser['device']['token'];
      const response = await this.sendPush(target, notifications);
      await this.historySave(response, guestUser);
    }

    const hostIsApp = await this.isApp(get(hostUser, ['device']));
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
}
