/// <reference types="lodash" />
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
import { ExcelService } from 'src/excel/excel.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { PushNotificationService } from 'src/push-notification/push-notification.service';
import { SettingsService } from 'src/settings/settings.service';
import { EmailService } from 'src/email/email.service';
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
    private readonly settingsService;
    private readonly excelService;
    private readonly emailService;
    constructor(orderRepository: Repository<OrderEntity>, productService: ProductService, usersService: UsersService, productOptionService: ProductOptionService, userService: UsersService, orderProductService: OrderProductService, ordertotalService: OrderTotalService, iamportService: IamportService, pgDataService: PgDataService, pushNotiService: PushNotificationService, settingsService: SettingsService, excelService: ExcelService, emailService: EmailService);
    create(userInfo: UsersEntity, createOrderDto: CreateOrderDto, req: any): Promise<{
        order: OrderEntity;
        orderProduct: import("../order-product/entities/order-product.entity").OrderProductEntity;
        po: import("../product-option/entities/product-option.entity").ProductOptionEntity;
        priceInfo: {};
    }>;
    iamportNoti(iamportNoti: any, req: any, res: any): Promise<void>;
    paymentProcessing(order_data: OrderEntity): Promise<void>;
    ordCreateCode(): Promise<string>;
    adminFindAll(userInfo: UsersEntity, options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<OrderEntity>;
    }>;
    guestFindAll(userInfo: UsersEntity, options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<OrderEntity>;
    }>;
    hostFindAll(userInfo: UsersEntity, options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<OrderEntity>;
    }>;
    findOneIdxByAdmin(idx: number): Promise<{
        order: OrderEntity;
    }>;
    findOneIdxByGuest(userInfo: UsersEntity, idx: number): Promise<{
        order: OrderEntity;
    }>;
    findOneIdxByHost(userInfo: UsersEntity, idx: number): Promise<{
        order: OrderEntity;
    }>;
    findOneIdx(idx: number): Promise<OrderEntity>;
    findOneCode(code: string): Promise<OrderEntity>;
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
    orderMailSendInfo(orderIdx: number): Promise<{
        order: OrderEntity;
        guestUser: UsersEntity;
        hostUser: UsersEntity;
        sendInfo: {
            po_title: any;
            product_title: any;
            occupancy_date: string;
            eviction_date: string;
            payment: number;
            po_payment: number;
            tax: number;
            fee: number;
            user_name: string;
            phone: string;
            cancel_reason: string;
        };
        site: import("lodash").Dictionary<import("../settings/entities/setting.entity").SettingEntity>;
    }>;
    guestOrderMail(ordIdx: any, cancelReason: string): Promise<void>;
    hostOrderMail(orderMailSendInfo: any, cancelReason: string): Promise<void>;
    adminOrderMail(orderMailSendInfo: any, cancelReason: string): Promise<void>;
    orderVerification(createOrderDto: CreateOrderDto | OrderEntity): Promise<any>;
    dashboard(month: string): Promise<any>;
    createExcel(userInfo: UsersEntity, options: PaginationOptions, search: string[], order: string): Promise<{
        file_name: string;
        file_path: string;
    }>;
}
