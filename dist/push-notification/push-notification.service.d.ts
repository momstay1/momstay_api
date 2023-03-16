import { HttpService } from '@nestjs/axios/dist';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';
import { PushHistoryEntity } from './entities/push-history.entity';
import { Repository } from 'typeorm';
import { ProductOptionEntity } from 'src/product-option/entities/product-option.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ReservationEntity } from 'src/reservation/entities/reservation.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import { DeviceEntity } from 'src/device/entities/device.entity';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersService } from 'src/users/users.service';
export declare class PushNotificationService {
    private pushHistoryRepository;
    private readonly http;
    private readonly userService;
    constructor(pushHistoryRepository: Repository<PushHistoryEntity>, http: HttpService, userService: UsersService);
    sendPush(target: any, notification: any): Promise<any>;
    historySave(response: any, userInfo?: UsersEntity): Promise<void>;
    private sendFcmMessage;
    private getAccessToken;
    create(createPushNotificationDto: CreatePushNotificationDto): string;
    findAll(options: PaginationOptions, search: string[], order: string, userInfo?: UsersEntity): Promise<{
        data: Pagination<PushHistoryEntity>;
    }>;
    findOne(id: number): string;
    update(id: number, updatePushNotificationDto: UpdatePushNotificationDto): string;
    remove(id: number): string;
    isApp(device: DeviceEntity): Promise<boolean>;
    guestOrderPush(hostUser: UsersEntity, po: ProductOptionEntity): Promise<void>;
    guestOrderCancelPush(hostUser: UsersEntity, po: ProductOptionEntity): Promise<void>;
    hostOrderCancelPush(guestUser: UsersEntity, order: OrderEntity): Promise<void>;
    hostOrderApprovalPush(guestUser: UsersEntity, order: OrderEntity): Promise<void>;
    guestReservationPush(hostUser: UsersEntity, po: ProductOptionEntity): Promise<void>;
    guestReservationCancelPush(hostUser: UsersEntity, reservation: ReservationEntity): Promise<void>;
    hostReservationCancelPush(guestUser: UsersEntity, reservation: ReservationEntity): Promise<void>;
    hostReservationApprovalPush(guestUser: UsersEntity, reservation: ReservationEntity): Promise<void>;
}
