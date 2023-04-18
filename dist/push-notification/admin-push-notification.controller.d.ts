import { PushNotificationService } from './push-notification.service';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
export declare class AdminPushNotificationController {
    private readonly pushNotificationService;
    constructor(pushNotificationService: PushNotificationService);
    create(createPushNotificationDto: CreatePushNotificationDto): Promise<{
        pushHistory: import("./entities/push-history.entity").PushHistoryEntity;
    }>;
    adminFindAll(take: number, page: number, search: string[], order: string): Promise<{
        results: import("./entities/push-history.entity").PushHistoryEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    findOne(idx: string): Promise<import("./entities/push-history.entity").PushHistoryEntity>;
}
