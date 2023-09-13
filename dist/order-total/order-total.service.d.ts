import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderTotalDto } from './dto/create-order-total.dto';
import { UpdateOrderTotalDto } from './dto/update-order-total.dto';
import { OrderTotalEntity } from './entities/order-total.entity';
export declare class OrderTotalService {
    private orderTotalRepository;
    constructor(orderTotalRepository: Repository<OrderTotalEntity>);
    create(createOrderTotalDto: CreateOrderTotalDto): string;
    orderTotalCreate(order: OrderEntity, orderProduct: OrderProductEntity): Promise<OrderTotalEntity[]>;
    priceChange(orderIdx: number, cancelPrice: number, cancelPriceEng: number): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    salesCalc(date: string, type: string): Promise<{
        year: any[];
        month: any[];
        day: any[];
    }>;
    salesStatisticsYear(year?: string): Promise<{
        sales_statistics: {
            year: any[];
            month: any[];
            day: any[];
        };
    }>;
    salesStatisticsMonth(year: string): Promise<{
        sales_statistics: {
            year: any[];
            month: any[];
            day: any[];
        };
    }>;
    salesStatisticsDay(yearMonth: string): Promise<{
        sales_statistics: {
            year: any[];
            month: any[];
            day: any[];
        };
    }>;
    findOneOrderIdx(orderIdx: number): Promise<OrderTotalEntity>;
    update(id: number, updateOrderTotalDto: UpdateOrderTotalDto): string;
    remove(id: number): string;
    dashboard(month: string): Promise<any>;
}
