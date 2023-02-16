import { Injectable } from '@nestjs/common';
import { CreateOrderTotalDto } from './dto/create-order-total.dto';
import { UpdateOrderTotalDto } from './dto/update-order-total.dto';

@Injectable()
export class OrderTotalService {
  create(createOrderTotalDto: CreateOrderTotalDto) {
    return 'This action adds a new orderTotal';
  }

  findAll() {
    return `This action returns all orderTotal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderTotal`;
  }

  update(id: number, updateOrderTotalDto: UpdateOrderTotalDto) {
    return `This action updates a #${id} orderTotal`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderTotal`;
  }
}
