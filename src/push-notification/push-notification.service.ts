import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';
import { google } from 'googleapis';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const MESSAGING_URL = 'https://fcm.googleapis.com/v1/projects/momstay-50e27/messages:send';
@Injectable()
export class PushNotificationService {
  constructor(private readonly http: HttpService) { }

  async sendPush({ topic, token }, { title, body, data }) {
    const message = {
      // topic: topic,
      // token: "",
      notification: {
        title: title,
        body: body
      },
      data: data
    };
    if (topic) {
      message['topic'] = topic;
    }
    if (token) {
      message['token'] = token;
    }
    await this.sendFcmMessage({ message });
  }

  private async sendFcmMessage(fcmMessage) {
    const http = this.http;

    const accessToken = await this.getAccessToken()

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
    console.log({ response });
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
    console.log({ tokens });
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
