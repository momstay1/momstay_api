import { Injectable, NotFoundException } from '@nestjs/common';
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
import { SettingsService } from 'src/settings/settings.service';

import * as moment from 'moment';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity) private orderProductRepository: Repository<OrderProductEntity>,
    private readonly fileService: FileService,
    private readonly settingsService: SettingsService,
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

    let op = {};
    if (get(createOrderDto, 'orderProductIdx', '')) {
      op = await this.findOneIdx(createOrderDto['orderProductIdx']);
      // op_data['idx'] = get(createOrderDto, 'orderProductIdx');
    }

    let priceInfo = {};
    if (get(createOrderDto, 'startAt', '') && get(createOrderDto, 'endAt', '')) {
      // 환율정보 가져오기
      const dollor_exchange_rate = await this.settingsService.findOne('dollor_exchange_rate');

      priceInfo = {
        price: await this.calcTotalPrice(get(po, 'priceMonth', 0), get(createOrderDto, 'startAt'), get(createOrderDto, 'endAt')),
        tax: commonUtils.getStatus('tax'),
        fee: commonUtils.getStatus('fee'),
      };
      // 월 가격 일별 가격으로 변경 후 총 가격 계산
      priceInfo['taxPrice'] = commonUtils.calcTax(priceInfo['price'], priceInfo['tax'] + '%');
      priceInfo['feePrice'] = commonUtils.calcTax(priceInfo['price'] + priceInfo['taxPrice'], priceInfo['fee'] + '%');
      priceInfo['totalPrice'] = priceInfo['price'] + priceInfo['taxPrice'] + priceInfo['feePrice'];

      if (+get(dollor_exchange_rate, 'set_value', 0) > 0) {
        priceInfo['priceEng'] = commonUtils.calcExchangeRate(priceInfo['price'], +dollor_exchange_rate.set_value);
        priceInfo['taxPriceEng'] = commonUtils.calcExchangeRate(priceInfo['taxPrice'], +dollor_exchange_rate.set_value);
        priceInfo['feePriceEng'] = commonUtils.calcExchangeRate(priceInfo['feePrice'], +dollor_exchange_rate.set_value);
        priceInfo['totalPriceEng'] = Math.floor((priceInfo['priceEng'] + priceInfo['taxPriceEng'] + priceInfo['feePriceEng']) * 100) / 100;
      }
    }
    console.log({ priceInfo });

    // 작업중
    op['status'] = order['status'];
    op['eq'] = '001';
    op['code'] = order['code'] + '-001';
    op['productOptionCode'] = po['product']['code'];
    op['productType'] = '1';
    op['parcelCode'] = order['code'] + '-P01';
    op['title'] = po['title'];
    op['options'] = po['code'];
    op['num'] = get(createOrderDto, 'num', 1);
    op['taxPrice'] = get(priceInfo, ['taxPrice'], 0);
    op['feePrice'] = get(priceInfo, ['feePrice'], 0);
    op['price'] = get(priceInfo, ['price'], 0);
    op['payPrice'] = get(priceInfo, ['totalPrice'], 0);
    op['taxPriceEng'] = get(priceInfo, ['taxPriceEng'], 0);
    op['feePriceEng'] = get(priceInfo, ['feePriceEng'], 0);
    op['priceEng'] = get(priceInfo, ['priceEng'], 0);
    op['payPriceEng'] = get(priceInfo, ['totalPriceEng'], 0);
    op['img'] = file[0]['file_storage_path'];
    op['user'] = get(order, 'user', null);
    op['order'] = order;
    op['productOption'] = po;

    if (get(createOrderDto, 'startAt', '')) op['startAt'] = get(createOrderDto, 'startAt');
    if (get(createOrderDto, 'endAt', '')) op['endAt'] = get(createOrderDto, 'endAt');
    if (get(createOrderDto, 'memo', '')) op['memo'] = get(createOrderDto, 'memo');

    const orderProductEntity = await this.orderProductRepository.create(op);
    const orderProduct = await this.orderProductRepository.save(orderProductEntity);
    return { orderProduct, priceInfo };
  }

  findAll() {
    return `This action returns all orderProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderProduct`;
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const orderProduct = await this.orderProductRepository.findOne({
      where: { idx: idx }
    });
    if (!get(orderProduct, 'idx', '')) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }
    return orderProduct;
  }

  update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    return `This action updates a #${id} orderProduct`;
  }

  async statusChange(orderIdx: number, status: number, cancelReason?: string) {
    const set = { status: status };
    if (cancelReason) {
      set['cancelReason'] = cancelReason;
    }
    await this.orderProductRepository.createQueryBuilder()
      .update(OrderProductEntity)
      .set(set)
      .where("`orderIdx` = :orderIdx", { orderIdx: orderIdx })
      .execute()
  }

  async cancelPrice(orderIdx: number, cancelPrice: number, cancelPriceEng: number) {
    await this.orderProductRepository.createQueryBuilder()
      .update(OrderProductEntity)
      .set({
        price: 0,
        taxPrice: 0,
        feePrice: 0,
        payPrice: 0,
        priceEng: 0,
        taxPriceEng: 0,
        feePriceEng: 0,
        payPriceEng: 0,
        cancelPrice: cancelPrice,
        cancelPriceEng: cancelPriceEng,
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
