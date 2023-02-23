import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { ProductService } from 'src/product/product.service';
import { ProductOptionService } from 'src/product-option/product-option.service';
import { UsersService } from 'src/users/users.service';
export declare class OrderService {
    private orderRepository;
    private readonly productService;
    private readonly productOptionService;
    private readonly userService;
    constructor(orderRepository: Repository<OrderEntity>, productService: ProductService, productOptionService: ProductOptionService, userService: UsersService);
    create(createOrderDto: CreateOrderDto, req: any): Promise<{
        order: OrderEntity;
    }>;
    ordCreateCode(): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    remove(id: number): string;
}
