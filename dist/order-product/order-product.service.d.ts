import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductOptionEntity } from 'src/product-option/entities/product-option.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { OrderProductEntity } from './entities/order-product.entity';
export declare class OrderProductService {
    private orderProductRepository;
    constructor(orderProductRepository: Repository<OrderProductEntity>);
    create(createOrderProductDto: CreateOrderProductDto): string;
    createOrderProduct(order: OrderEntity, po: ProductOptionEntity): Promise<OrderProductEntity>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderProductDto: UpdateOrderProductDto): string;
    remove(id: number): string;
}
