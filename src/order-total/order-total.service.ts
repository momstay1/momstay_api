import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, sortBy } from 'lodash';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderTotalDto } from './dto/create-order-total.dto';
import { UpdateOrderTotalDto } from './dto/update-order-total.dto';
import { OrderTotalEntity } from './entities/order-total.entity';
import * as moment from 'moment';
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
    orderTotalInfo['totalPriceEng'] = orderProduct['payPriceEng'] * num;
    orderTotalInfo['payPriceEng'] = orderProduct['payPriceEng'] * num;
    orderTotalInfo['origPayPriceEng'] = orderProduct['payPriceEng'] * num;

    const orderTotalEntity = await this.orderTotalRepository.create(orderTotalInfo);
    const orderTotal = await this.orderTotalRepository.save(orderTotalEntity);
    return orderTotal;
  }

  async priceChange(orderIdx: number, cancelPrice: number, cancelPriceEng: number) {
    const total = await this.orderTotalRepository.findOne({
      where: { orderIdx: orderIdx }
    });

    total['totalPrice'] = +total['totalPrice'] - cancelPrice;
    total['totalCancelPrice'] = +total['totalCancelPrice'] + cancelPrice;
    total['payPrice'] = +total['payPrice'] - cancelPrice;
    total['totalPriceEng'] = +total['totalPriceEng'] - cancelPriceEng;
    total['totalCancelPriceEng'] = +total['totalCancelPriceEng'] + cancelPriceEng;
    total['payPriceEng'] = +total['payPriceEng'] - cancelPriceEng;

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

  async salesCalc(date: string, type: string) {
    let monent_format, sql_format;
    switch (type) {
      case 'year':
        monent_format = 'YYYY';
        sql_format = '%Y';
        break;
      case 'month':
        monent_format = 'YYYY-MM';
        sql_format = '%Y';
        break;
      case 'day':
        monent_format = 'YYYY-MM-DD';
        sql_format = '%Y-%m';
        break;
    }
    const alias = 'order_total';
    const [results, total] =
      await this.orderTotalRepository.createQueryBuilder(alias)
        .leftJoinAndSelect('order', 'order', alias + '.orderIdx=order.idx')
        .where(qb => {
          qb.where('DATE_FORMAT(`' + alias + '`.`createdAt`, "' + sql_format + '") = :date', { date: date });
          qb.andWhere('order.status > 0');
        })
        .orderBy(alias + '.createdAt', 'DESC')
        .getManyAndCount()
    const sales_statistics = {
      year: [],
      month: [],
      day: [],
    };
    const statistics = {};
    if (results.length > 0) {
      for (const key in results) {
        const date_key = moment(results[key].createdAt).format(monent_format);
        if (!statistics[date_key]) {
          statistics[date_key] = {
            date: date_key,
            number: 0,
            pay_price: 0,
            cancel_price: 0,
            pay_price_eng: 0.00,
            cancel_price_eng: 0.00,
          }
        }
        statistics[date_key].number++;
        statistics[date_key].pay_price += +results[key].totalPrice;
        statistics[date_key].cancel_price += +results[key].totalCancelPrice;
        statistics[date_key].pay_price_eng += +results[key].totalPriceEng;
        statistics[date_key].cancel_price_eng += +results[key].totalCancelPriceEng;
      }
      // 날짜기준 순서 정렬
      sales_statistics[type] = sortBy(statistics, 'date').reverse();
    }
    return sales_statistics;
  }

  async salesStatisticsYear(year?: string) {
    year = year ? year : '2023';
    const sales_statistics = await this.salesCalc(year, 'year');
    return { sales_statistics };
  }
  async salesStatisticsMonth(year: string) {
    const sales_statistics = await this.salesCalc(year, 'month');
    return { sales_statistics };
  }
  async salesStatisticsDay(yearMonth: string) {
    const sales_statistics = await this.salesCalc(yearMonth, 'day');
    return { sales_statistics };
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

  async dashboard(month: string) {
    const orderTotal_cnt = await this.orderTotalRepository.createQueryBuilder('orderTotal')
      .select('SUM(orderTotal.`payPrice`)', 'total_pay_price')
      .leftJoin('order', 'order', '`orderTotal`.orderIdx = `order`.`idx`')
      .where(qb => {
        qb.where('DATE_FORMAT(orderTotal.`createdAt`, "%Y-%m") = :month', { month: month })
        qb.andWhere('order.status IN (:status)', { status: [2, 3, 4, 6] })
      })
      .execute();
    return orderTotal_cnt;
  }
}
