import { HttpService } from '@nestjs/axios/dist';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';
import { PushHistoryEntity } from './entities/push-history.entity';
import { Repository } from 'typeorm';
export declare class PushNotificationService {
    private pushHistoryRepository;
    private readonly http;
    constructor(pushHistoryRepository: Repository<PushHistoryEntity>, http: HttpService);
    sendPush({ topic, token }: {
        topic: any;
        token: any;
    }, { title, body, data }: {
        title: any;
        body: any;
        data: any;
    }): Promise<void>;
    historySave(response: any): Promise<void>;
    private sendFcmMessage;
    private getAccessToken;
    create(createPushNotificationDto: CreatePushNotificationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePushNotificationDto: UpdatePushNotificationDto): string;
    remove(id: number): string;
}
