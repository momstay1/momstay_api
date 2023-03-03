import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderTotalDto } from './dto/create-order-total.dto';
import { UpdateOrderTotalDto } from './dto/update-order-total.dto';
import { OrderTotalEntity } from './entities/order-total.entity';

@Injectable()
export class OrderTotalService {
  constructor(
    @InjectRepository(OrderTotalEntity) private orderTotalRepository: Repository<OrderTotalEntity>,
    // private readonly orderProductService: OrderProductService,
  ) { }

  create(createOrderTotalDto: CreateOrderTotalDto) {
    return 'This action adds a new orderTotal';
  }

  async orderTotalCreate(order: OrderEntity, orderProduct: OrderProductEntity) {

    const total_data = {
      orderIdx: '' + order['idx'],
      totalPrice: orderProduct['price'] * orderProduct['num'],
      payPrice: orderProduct['payPrice'] * orderProduct['num'],
      origPayPrice: orderProduct['payPrice'] * orderProduct['num'],
    };

    const orderTotal_data = await this.orderTotalRepository.create(total_data);
    const orderTotal = await this.orderTotalRepository.save(orderTotal_data);
    return orderTotal;
  }

  async priceChange(orderIdx: number, cancelPrice: number) {
    const total = await this.orderTotalRepository.findOne({
      where: { orderIdx: orderIdx }
    });

    total['totalPrice'] = total['totalPrice'] - cancelPrice;
    total['totalCancelPrice'] = total['totalCancelPrice'] + cancelPrice;
    total['payPrice'] = total['payPrice'] - cancelPrice;
    await this.orderTotalRepository.createQueryBuilder()
      .update(OrderTotalEntity)
      .set(total)
      .where("idx = :idx", { idx: total['idx'] })
      .execute()
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
