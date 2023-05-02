import { FileService } from 'src/file/file.service';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductOptionEntity } from 'src/product-option/entities/product-option.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { OrderProductEntity } from './entities/order-product.entity';
import { SettingsService } from 'src/settings/settings.service';
export declare class OrderProductService {
    private orderProductRepository;
    private readonly fileService;
    private readonly settingsService;
    constructor(orderProductRepository: Repository<OrderProductEntity>, fileService: FileService, settingsService: SettingsService);
    create(createOrderProductDto: CreateOrderProductDto): string;
    createOrderProduct(order: OrderEntity, po: ProductOptionEntity, createOrderDto: any): Promise<{
        orderProduct: OrderProductEntity;
        priceInfo: {};
    }>;
    findAll(): string;
    findOne(id: number): string;
    findOneIdx(idx: number): Promise<OrderProductEntity>;
    update(id: number, updateOrderProductDto: UpdateOrderProductDto): string;
    statusChange(orderIdx: number, status: number, cancelReason?: string): Promise<void>;
    cancelPrice(orderIdx: number, cancelPrice: number, cancelPriceEng: number): Promise<void>;
    remove(id: number): string;
    calcTotalPrice(priceMonth: number, start: string | Date, end: string | Date): Promise<number>;
}
