import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(user: UsersEntity, createOrderDto: CreateOrderDto, req: any): Promise<{
        order: import("./entities/order.entity").OrderEntity;
        orderProduct: import("../order-product/entities/order-product.entity").OrderProductEntity;
        po: import("../product-option/entities/product-option.entity").ProductOptionEntity;
        priceInfo: {};
    }>;
    iamportNoti(iamportNoti: any, req: any): Promise<void>;
    test(order_idx: string, price: string): Promise<void>;
    guestFindAll(user: UsersEntity, take: number, page: number, search: string[], order: string): Promise<{
        data: import("../paginate").Pagination<import("./entities/order.entity").OrderEntity>;
    }>;
    hostFindAll(user: UsersEntity, take: number, page: number, search: string[], order: string): Promise<{
        data: import("../paginate").Pagination<import("./entities/order.entity").OrderEntity>;
    }>;
    findOneIdxByGuest(user: UsersEntity, idx: string): Promise<{
        order: import("./entities/order.entity").OrderEntity;
    }>;
    findOneIdxByHost(user: UsersEntity, idx: string): Promise<{
        order: import("./entities/order.entity").OrderEntity;
    }>;
    findOneCodeByNonmember(code: string): Promise<{
        order: import("./entities/order.entity").OrderEntity;
    }>;
    hostOrderApproval(user: UsersEntity, code: string): Promise<void>;
    guestOrderCancel(user: UsersEntity, code: string): Promise<void>;
    hostOrderCancel(user: UsersEntity, code: string, updateOrderDto: UpdateOrderDto): Promise<void>;
    remove(id: string): string;
}
