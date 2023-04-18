import { OrderService } from './order.service';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class AdminOrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    guestFindAll(user: UsersEntity, take: number, page: number, search: string[], order: string): Promise<{
        data: import("../paginate").Pagination<import("./entities/order.entity").OrderEntity>;
    }>;
    excelDownload(user: UsersEntity, take: number, page: number, search: string[], order: string, res: any): Promise<void>;
    findOneIdxByAdmin(idx: string): Promise<{
        order: import("./entities/order.entity").OrderEntity;
    }>;
}
