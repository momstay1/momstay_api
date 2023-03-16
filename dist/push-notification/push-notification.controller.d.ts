import { PushNotificationService } from './push-notification.service';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class PushNotificationController {
    private readonly pushNotificationService;
    constructor(pushNotificationService: PushNotificationService);
    create(createPushNotificationDto: CreatePushNotificationDto): string;
    test(): Promise<any>;
    findAll(user: UsersEntity, take: number, page: number, search: string[], order: string): Promise<{
        results: import("./entities/push-history.entity").PushHistoryEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    findAllNonMember(take: number, page: number, search: string[], order: string): Promise<{
        results: import("./entities/push-history.entity").PushHistoryEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    findOne(id: string): string;
    update(id: string, updatePushNotificationDto: UpdatePushNotificationDto): string;
    remove(id: string): string;
}
