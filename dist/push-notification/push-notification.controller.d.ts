import { PushNotificationService } from './push-notification.service';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class PushNotificationController {
    private readonly pushNotificationService;
    constructor(pushNotificationService: PushNotificationService);
    test(topic: string, token: string, title: string, body: string): Promise<void>;
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
}
