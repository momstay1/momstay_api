import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';
import { google } from 'googleapis';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { PushHistoryEntity } from './entities/push-history.entity';
import { Repository } from 'typeorm';
import { get, isEmpty } from 'lodash';
import { ProductOptionEntity } from 'src/product-option/entities/product-option.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ReservationEntity } from 'src/reservation/entities/reservation.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import { DeviceEntity } from 'src/device/entities/device.entity';

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const MESSAGING_URL = 'https://fcm.googleapis.com/v1/projects/momstay-50e27/messages:send';
let accessToken;
@Injectable()
export class PushNotificationService {
  constructor(
    @InjectRepository(PushHistoryEntity) private pushHistoryRepository: Repository<PushHistoryEntity>,
    private readonly http: HttpService,
  ) { }

  async sendPush(target, notification) {
    const message = { notification };
    if (get(target, 'topic', '')) {
      message['topic'] = target['topic'];
    } else {
      message['token'] = target['token'];
    }
    try {
      const response = await this.sendFcmMessage({ message });
      await this.historySave(response);
    } catch (error) {
      await this.historySave(error.response);
    }
  }

  async historySave(response) {
    const data = JSON.parse(response.config.data);
    const push_history_data = {
      status: '' + response.status,
      topic: get(data, ['message', 'topic'], ''),
      token: get(data, ['message', 'token'], ''),
      data: get(data, ['message', 'data'], '') && JSON.stringify(get(data, ['message', 'data'])),
      notifications: response.config.data,
      error: get(response, ['data', 'error'], '') && JSON.stringify(get(response, ['data', 'error'])),
    };
    const pushHistory = await this.pushHistoryRepository.create(push_history_data);
    await this.pushHistoryRepository.save(pushHistory);
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

  create(createPushNotificationDto: CreatePushNotificationDto) {
    return 'This action adds a new pushNotification';
  }

  findAll() {
    return `This action returns all pushNotification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pushNotification`;
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

  async guestOrderPush(hostUser: UsersEntity, po: ProductOptionEntity) {
    const isApp = await this.isApp(get(hostUser, ['device']));
    if (isApp) {
      const target = {
        token: hostUser['device']['token'],
      }
      const notifications = {
        title: po['product']['title'] + '숙소 ' + po['title'] + '방 결제가 완료되었습니다.',
        body: po['product']['title'] + '숙소 ' + po['title'] + '방 결제가 완료되었습니다.',
      };
      await this.sendPush(target, notifications);
    }
  }
  async guestOrderCancelPush(hostUser: UsersEntity, po: ProductOptionEntity) {
    const isApp = await this.isApp(get(hostUser, ['device']));
    if (isApp) {
      const target = {
        token: hostUser['device']['token'],
      }
      const notifications = {
        title: po['product']['title'] + '숙소 ' + po['title'] + '방 결제를 취소했습니다.',
        body: po['product']['title'] + '숙소 ' + po['title'] + '방 결제를 취소했습니다.',
      };
      await this.sendPush(target, notifications);
    }
  }
  async hostOrderCancelPush(guestUser: UsersEntity, order: OrderEntity) {
    const isApp = await this.isApp(get(guestUser, ['device']));
    if (isApp) {
      const target = {
        token: guestUser['device']['token'],
      }
      const notifications = {
        title: '호스트가 ' + order['orderProduct']['productOption']['product']['title']
          + '숙소 ' + order['orderProduct']['productOption']['title'] + '방 결제를 거절했습니다.',
        body: '호스트가 ' + order['orderProduct']['productOption']['product']['title']
          + '숙소 ' + order['orderProduct']['productOption']['title'] + '방 결제를 거절했습니다.',
      };
      await this.sendPush(target, notifications);
    }
  }
  async hostOrderApprovalPush(guestUser: UsersEntity, order: OrderEntity) {
    const isApp = await this.isApp(get(guestUser, ['device']));
    if (isApp) {
      const target = {
        token: guestUser['device']['token'],
      }
      const notifications = {
        title: '호스트가 ' + order['orderProduct']['productOption']['product']['title']
          + '숙소 ' + order['orderProduct']['productOption']['title'] + '방 결제를 승인했습니다.',
        body: '호스트가 ' + order['orderProduct']['productOption']['product']['title']
          + '숙소 ' + order['orderProduct']['productOption']['title'] + '방 결제를 승인했습니다.',
      };
      await this.sendPush(target, notifications);
    }
  }

  async guestReservationPush(hostUser: UsersEntity, po: ProductOptionEntity) {
    const isApp = await this.isApp(get(hostUser, ['device']));
    if (isApp) {
      const target = {
        token: hostUser['device']['token'],
      }
      const notifications = {
        title: po['product']['title'] + '숙소 ' + po['title'] + '방 방문예약이 있습니다.',
        body: po['product']['title'] + '숙소 ' + po['title'] + '방 방문예약이 있습니다.',
      };
      await this.sendPush(target, notifications);
    }
  }
  async guestReservationCancelPush(hostUser: UsersEntity, reservation: ReservationEntity) {
    const isApp = await this.isApp(get(hostUser, ['device']));
    if (isApp) {
      const target = {
        token: hostUser['device']['token'],
      }
      const notifications = {
        title:
          reservation['productOption']['product']['title']
          + '숙소 '
          + reservation['productOption']['title']
          + '방 방문예약이 취소되었습니다.',
        body:
          reservation['productOption']['product']['title']
          + '숙소 '
          + reservation['productOption']['title']
          + '방 방문예약이 취소되었습니다.',
      };
      await this.sendPush(target, notifications);
    }
  }
  async hostReservationCancelPush(guestUser: UsersEntity, reservation: ReservationEntity) {
    const isApp = await this.isApp(get(guestUser, ['device']));
    if (isApp) {
      const target = {
        token: guestUser['device']['token'],
      }
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
  async hostReservationApprovalPush(guestUser: UsersEntity, reservation: ReservationEntity) {
    const isApp = await this.isApp(get(guestUser, ['device']));
    if (isApp) {
      const target = {
        token: guestUser['device']['token'],
      }
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
}
