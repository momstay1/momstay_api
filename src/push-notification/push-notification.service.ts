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
import { get } from 'lodash';

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const MESSAGING_URL = 'https://fcm.googleapis.com/v1/projects/momstay-50e27/messages:send';
let accessToken;
@Injectable()
export class PushNotificationService {
  constructor(
    @InjectRepository(PushHistoryEntity) private pushHistoryRepository: Repository<PushHistoryEntity>,
    private readonly http: HttpService,
  ) { }

  async sendPush({ topic, token }, { title, body, data }) {
    const message = {
      // topic: topic,
      // token: "",
      notification: {
        title: title,
        body: body
      },
      // data: ''
    };
    if (topic) {
      message['topic'] = topic;
    } else {
      message['token'] = token;
    }
    if (data) {
      message['data'] = data;
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
}
