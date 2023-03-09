import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
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
    let orderTotalInfo;
    try {
      orderTotalInfo = await this.findOneOrderIdx(order['idx']);
    } catch (error) {
      orderTotalInfo = {};
    }

    const num = get(orderProduct, ['num']) > 0 ? orderProduct['num'] : 1;
    orderTotalInfo['orderIdx'] = '' + order['idx'];
    orderTotalInfo['totalPrice'] = orderProduct['payPrice'] * num;
    orderTotalInfo['payPrice'] = orderProduct['payPrice'] * num;
    orderTotalInfo['origPayPrice'] = orderProduct['payPrice'] * num;

    const orderTotalEntity = await this.orderTotalRepository.create(orderTotalInfo);
    const orderTotal = await this.orderTotalRepository.save(orderTotalEntity);
    return orderTotal;
  }

  async priceChange(orderIdx: number, cancelPrice: number) {
    const total = await this.orderTotalRepository.findOne({
      where: { orderIdx: orderIdx }
    });

    console.log({ total });

    total['totalPrice'] = +total['totalPrice'] - cancelPrice;
    total['totalCancelPrice'] = +total['totalCancelPrice'] + cancelPrice;
    total['payPrice'] = +total['payPrice'] - cancelPrice;
    console.log({ total });
    // await this.orderTotalRepository.createQueryBuilder()
    //   .update(OrderTotalEntity)
    //   .set(total)
    //   .where("idx = :idx", { idx: total['idx'] })
    //   .execute()
  }

  findAll() {
    return `This action returns all orderTotal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderTotal`;
  }

  async findOneOrderIdx(orderIdx: number) {
    if (!orderIdx) {
      throw new NotFoundException('주문 번호 정보가 없습니다.');
    }
    const orderTotal = await this.orderTotalRepository.findOne({
      where: { orderIdx: orderIdx }
    });
    if (!get(orderTotal, 'idx', '')) {
      throw new NotFoundException('조회된 정보가 없습니다.');
    }
    return orderTotal;
  }

  update(id: number, updateOrderTotalDto: UpdateOrderTotalDto) {
    return `This action updates a #${id} orderTotal`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderTotal`;
  }
}
