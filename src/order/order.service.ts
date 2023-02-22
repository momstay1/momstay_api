import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { commonUtils } from 'src/common/common.utils';
import { ProductService } from 'src/product/product.service';
import { ProductOptionService } from 'src/product-option/product-option.service';

import * as moment from 'moment';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
    private readonly productService: ProductService,
    private readonly productOptionService: ProductOptionService,
    private readonly userService: UsersService,
  ) { }

  async create(createOrderDto: CreateOrderDto, req) {

    // 상품 및 옵션 정보 가져오기
    const po = await this.productOptionService.findIdx(+createOrderDto['productOptionIdx']);
    // console.log({ po });

    // 회원 주문인 경우 회원 정보 가져오기
    let user = null;
    if (get(createOrderDto, 'userIdx', '')) {
      user = await this.userService.findIdx(+createOrderDto['userIdx']);
    }

    // 주문 수량 체크 기능 필요

    // 주문 설정
    if (!get(createOrderDto, 'idx', 0)) {
      createOrderDto['code'] = await this.ordCreateCode();
      createOrderDto['userAgent'] = req.get('user-agent');
      createOrderDto['status'] = get(createOrderDto, 'status', 0);
      createOrderDto['pc_mobile'] = commonUtils.isMobile(createOrderDto['userAgent']);
      createOrderDto['userIdx'] = user;
    } else {
      const order = await this.orderRepository.findOne({ idx: createOrderDto['idx'] });
      if (createOrderDto['status'] == 2) {
        createOrderDto['paiedAt'] = get(order, 'paiedAt', moment().format('YYYY-MM-DD'));
      }
    }
    // console.log({ createOrderDto });

    // 주문 상품 설정 기능 작업중
    // total 주문 설정 기능 필요

    const order_data = await this.orderRepository.create(createOrderDto);
    const order = await this.orderRepository.save(order_data);

    return { order };
  }

  async ordCreateCode() {
    const code = moment().format('YYMMDD') + commonUtils.createCode().toUpperCase();
    const isCode = await this.orderRepository.findOne({
      where: { code: code }
    });

    if (isCode) {
      this.ordCreateCode();
    } else {
      return code;
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
