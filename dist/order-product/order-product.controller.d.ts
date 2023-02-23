import { OrderProductService } from './order-product.service';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
export declare class OrderProductController {
    private readonly orderProductService;
    constructor(orderProductService: OrderProductService);
    create(createOrderProductDto: CreateOrderProductDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOrderProductDto: UpdateOrderProductDto): string;
    remove(id: string): string;
}
