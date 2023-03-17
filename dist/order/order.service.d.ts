import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { ProductService } from 'src/product/product.service';
import { ProductOptionService } from 'src/product-option/product-option.service';
import { UsersService } from 'src/users/users.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { OrderTotalService } from 'src/order-total/order-total.service';
import { IamportService } from 'src/iamport/iamport.service';
import { PgDataService } from 'src/pg-data/pg-data.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { PushNotificationService } from 'src/push-notification/push-notification.service';
export declare class OrderService {
    private orderRepository;
    private readonly productService;
    private readonly usersService;
    private readonly productOptionService;
    private readonly userService;
    private readonly orderProductService;
    private readonly ordertotalService;
    private readonly iamportService;
    private readonly pgDataService;
    private readonly pushNotiService;
    constructor(orderRepository: Repository<OrderEntity>, productService: ProductService, usersService: UsersService, productOptionService: ProductOptionService, userService: UsersService, orderProductService: OrderProductService, ordertotalService: OrderTotalService, iamportService: IamportService, pgDataService: PgDataService, pushNotiService: PushNotificationService);
    create(userInfo: UsersEntity, createOrderDto: CreateOrderDto, req: any): Promise<{
        order: OrderEntity;
        orderProduct: import("../order-product/entities/order-product.entity").OrderProductEntity;
        po: import("../product-option/entities/product-option.entity").ProductOptionEntity;
        priceInfo: {};
    }>;
    ordCreateCode(): Promise<string>;
    guestFindAll(userInfo: UsersEntity, options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<OrderEntity>;
    }>;
    hostFindAll(userInfo: UsersEntity, options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<OrderEntity>;
    }>;
    findOneIdxByGuest(userInfo: UsersEntity, idx: number): Promise<{
        order: OrderEntity;
    }>;
    findOneIdxByHost(userInfo: UsersEntity, idx: number): Promise<{
        order: OrderEntity;
    }>;
    findOneIdx(idx: number): Promise<OrderEntity>;
    findOneCodeByNonmember(code: string): Promise<{
        order: OrderEntity;
    }>;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    guestOrderCancel(code: string, userInfo: UsersEntity): Promise<void>;
    hostOrderApproval(code: string, userInfo: UsersEntity): Promise<void>;
    hostOrderCancel(code: string, userInfo: UsersEntity, updateOrderDto: UpdateOrderDto): Promise<void>;
    cancelProcess(order: any, cancelReason: any): Promise<void>;
    statusChange(idx: number, status: number): Promise<void>;
    test(order_idx: string, price: string): Promise<void>;
    remove(id: number): string;
    orderVerification(createOrderDto: CreateOrderDto): Promise<any>;
}
