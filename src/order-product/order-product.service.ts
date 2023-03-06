import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductOptionEntity } from 'src/product-option/entities/product-option.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { OrderProductEntity } from './entities/order-product.entity';

import * as moment from 'moment';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity) private orderProductRepository: Repository<OrderProductEntity>,
    private readonly fileService: FileService,
    // private readonly productService: ProductService,
    // private readonly productOptionService: ProductOptionService,
    // private readonly userService: UsersService,
  ) { }

  create(createOrderProductDto: CreateOrderProductDto) {
    return 'This action adds a new orderProduct';
  }

  async createOrderProduct(order: OrderEntity, po: ProductOptionEntity, createOrderDto) {
    // 추후 민터스 또는 그외 사이트 작업시 ProductOptionEntity => ProductOptionEntity[]로 변경
    // ProductOptionEntity[] 변경 후 아래 작업 반복문으로 작업 필요
    // 파일 정보 가져오기
    const file = await this.fileService.findCategoryForeignAll(['roomDetailImg'], [po['idx']]);

    const priceInfo = {
      price: await this.calcTotalPrice(get(po, 'priceMonth', 0), get(createOrderDto, 'startAt'), get(createOrderDto, 'endAt')),
      tax: commonUtils.getStatus('tax'),
      fee: commonUtils.getStatus('fee'),
    };
    // 월 가격 일별 가격으로 변경 후 총 가격 계산
    priceInfo['texPrice'] = commonUtils.calcTax(priceInfo['price'], priceInfo['tax'] + '%');
    priceInfo['feePrice'] = commonUtils.calcTax(priceInfo['price'] + priceInfo['texPrice'], priceInfo['fee'] + '%');

    // 작업중
    const op_data = {
      status: order['status'],
      eq: '001',
      code: order['code'] + '-001',
      productOptionIdx: '' + po['idx'],
      productOptionCode: po['product']['code'],
      productType: '1',
      parcelCode: order['code'] + '-P01',
      title: po['title'],
      options: po['code'],
      taxPrice: priceInfo['texPrice'],
      feePrice: priceInfo['feePrice'],
      price: priceInfo['price'],
      payPrice: priceInfo['price'] + priceInfo['texPrice'] + priceInfo['feePrice'],
      img: file[0]['file_storage_path'],
      userIdx: get(order, 'user', null),
      orderIdx: order,
    }

    if (get(createOrderDto, 'num', '')) op_data['num'] = get(createOrderDto, 'num');
    if (get(createOrderDto, 'startAt', '')) op_data['startAt'] = get(createOrderDto, 'startAt');
    if (get(createOrderDto, 'endAt', '')) op_data['endAt'] = get(createOrderDto, 'endAt');
    if (get(createOrderDto, 'ClientMemo', '')) op_data['memo'] = get(createOrderDto, 'clientMemo');
    if (get(createOrderDto, 'orderProductIdx', '')) op_data['idx'] = get(createOrderDto, 'orderProductIdx');

    const orderProduct_data = await this.orderProductRepository.create(op_data);
    const orderProduct = await this.orderProductRepository.save(orderProduct_data);
    return { orderProduct, priceInfo };
  }

  findAll() {
    return `This action returns all orderProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderProduct`;
  }

  update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    return `This action updates a #${id} orderProduct`;
  }

  async statusChange(orderIdx: number, status: number) {
    await this.orderProductRepository.createQueryBuilder()
      .update(OrderProductEntity)
      .set({ status: status })
      .where("`orderIdx` = :orderIdx", { orderIdx: orderIdx })
      .execute()
  }

  async cancelPrice(orderIdx: number, cancelPrice: number) {
    await this.orderProductRepository.createQueryBuilder()
      .update(OrderProductEntity)
      .set({
        price: 0,
        taxPrice: 0,
        feePrice: 0,
        payPrice: 0,
        cancelPrice: cancelPrice,
      })
      .where("`orderIdx` = :orderIdx", { orderIdx: orderIdx })
      .execute()
  }

  remove(id: number) {
    return `This action removes a #${id} orderProduct`;
  }

  async calcTotalPrice(priceMonth: number, start: string | Date, end: string | Date) {
    const start_date = moment(start);
    const end_date = moment(end);
    const start_year = start_date.format('YYYY');
    const start_month = start_date.format('MM'); // 입주 달

    let totalPrice = 0; // 총 가격
    let i = 0;
    let diff_days = end_date.diff(start_date, 'days') + 1; // 입주날 - 퇴거날 + 1 = 총 주거 일
    let start_day = start_date.format('DD'); // 입주 일
    console.log('총 주거일:', diff_days);
    do {
      // 매달 마지막 일
      const end_day = +moment(start_year + '-' + start_month).add(i, 'month').endOf('month').format('DD');
      // 월 가격 / 매달 마지막 일 = 일 평균 가격
      const priceDay = priceMonth > 0 ? +(priceMonth / end_day).toFixed() : priceMonth;

      // 월별 주거 일수 구하기
      const last_month = moment(start_year + '-' + start_month + '-' + end_day).add(i, 'month');
      const first_month = moment(start_year + '-' + start_month + '-' + start_day).add(i, 'month');
      const days = last_month.diff(first_month, 'day') + 1;

      // 남은 주거일이 월별 주거 일수보다 적은경우 남은 주거일로 계산
      if (diff_days >= days) {
        // 첫 월 ~ 퇴거 전월 계산
        console.log('--------------주거 일: ', days);
        console.log('---------한달 일 가격: ', priceDay);
        totalPrice += (priceDay * days);
      } else {
        // 퇴거 월 계산
        console.log('--------------주거 일: ', diff_days);
        console.log('---------한달 일 가격: ', priceDay);
        totalPrice += (priceDay * diff_days);
        break;
      }

      i++; // 다음달
      diff_days = diff_days - days; // 남은 주거일
      start_day = moment(start_year + '-' + start_month).add(i).startOf('month').format('DD'); // 입주일 계산 이후 매 달 첫일
      if (!totalPrice || diff_days < 0) {
        throw new Error("계산 오류");
      }
    } while (diff_days > 0);

    return totalPrice;
  }
}
