import { PushNotificationService } from './push-notification.service';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';
export declare class PushNotificationController {
    private readonly pushNotificationService;
    constructor(pushNotificationService: PushNotificationService);
    create(createPushNotificationDto: CreatePushNotificationDto): string;
    test(): Promise<void>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePushNotificationDto: UpdatePushNotificationDto): string;
    remove(id: string): string;
}
