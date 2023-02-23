import { CreateOrderTotalDto } from './dto/create-order-total.dto';
import { UpdateOrderTotalDto } from './dto/update-order-total.dto';
export declare class OrderTotalService {
    create(createOrderTotalDto: CreateOrderTotalDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderTotalDto: UpdateOrderTotalDto): string;
    remove(id: number): string;
}
