import { OrderTotalService } from './order-total.service';
import { CreateOrderTotalDto } from './dto/create-order-total.dto';
import { UpdateOrderTotalDto } from './dto/update-order-total.dto';
export declare class OrderTotalController {
    private readonly orderTotalService;
    constructor(orderTotalService: OrderTotalService);
    create(createOrderTotalDto: CreateOrderTotalDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOrderTotalDto: UpdateOrderTotalDto): string;
    remove(id: string): string;
}
