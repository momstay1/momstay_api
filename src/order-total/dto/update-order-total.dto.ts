import { PartialType } from '@nestjs/swagger';
import { CreateOrderTotalDto } from './create-order-total.dto';

export class UpdateOrderTotalDto extends PartialType(CreateOrderTotalDto) {}
