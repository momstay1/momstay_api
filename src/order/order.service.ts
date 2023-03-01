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
import { OrderProductService } from 'src/order-product/order-product.service';
import { OrderTotalService } from 'src/order-total/order-total.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
    private readonly productService: ProductService,
    private readonly productOptionService: ProductOptionService,
    private readonly userService: UsersService,
    private readonly orderProductService: OrderProductService,
    private readonly ordertotalService: OrderTotalService,
  ) { }

  async create(createOrderDto: CreateOrderDto, req) {

    const ord_data = {};
    if (get(createOrderDto, 'status', '')) ord_data['status'] = get(createOrderDto, 'status');
    if (get(createOrderDto, 'imp_uid', '')) ord_data['imp_uid'] = get(createOrderDto, 'imp_uid');
    if (get(createOrderDto, 'billingKey', '')) ord_data['billingKey'] = get(createOrderDto, 'billingKey');
    if (get(createOrderDto, 'payment', '')) ord_data['payment'] = get(createOrderDto, 'payment');
    if (get(createOrderDto, 'clientName', '')) ord_data['clientName'] = get(createOrderDto, 'clientName');
    if (get(createOrderDto, 'clientEmail', '')) ord_data['clientEmail'] = get(createOrderDto, 'clientEmail');
    if (get(createOrderDto, 'clientPhone1', '')) ord_data['clientPhone1'] = get(createOrderDto, 'clientPhone1');
    if (get(createOrderDto, 'clientPhone2', '')) ord_data['clientPhone2'] = get(createOrderDto, 'clientPhone2');
    if (get(createOrderDto, 'inPostCode', '')) ord_data['inPostCode'] = get(createOrderDto, 'inPostCode');
    if (get(createOrderDto, 'inAddr1', '')) ord_data['inAddr1'] = get(createOrderDto, 'inAddr1');
    if (get(createOrderDto, 'inAddr2', '')) ord_data['inAddr2'] = get(createOrderDto, 'inAddr2');
    if (get(createOrderDto, 'shipName', '')) ord_data['shipName'] = get(createOrderDto, 'shipName');
    if (get(createOrderDto, 'shipPhone1', '')) ord_data['shipPhone1'] = get(createOrderDto, 'shipPhone1');
    if (get(createOrderDto, 'shipPhone2', '')) ord_data['shipPhone2'] = get(createOrderDto, 'shipPhone2');
    if (get(createOrderDto, 'shipArea', '')) ord_data['shipArea'] = get(createOrderDto, 'shipArea');
    if (get(createOrderDto, 'shipPostCode', '')) ord_data['shipPostCode'] = get(createOrderDto, 'shipPostCode');
    if (get(createOrderDto, 'shipNation', '')) ord_data['shipNation'] = get(createOrderDto, 'shipNation');
    if (get(createOrderDto, 'shipState', '')) ord_data['shipState'] = get(createOrderDto, 'shipState');
    if (get(createOrderDto, 'shipCity', '')) ord_data['shipCity'] = get(createOrderDto, 'shipCity');
    if (get(createOrderDto, 'shipAddr1', '')) ord_data['shipAddr1'] = get(createOrderDto, 'shipAddr1');
    if (get(createOrderDto, 'shipAddr2', '')) ord_data['shipAddr2'] = get(createOrderDto, 'shipAddr2');
    if (get(createOrderDto, 'bank', '')) ord_data['bank'] = get(createOrderDto, 'bank');
    if (get(createOrderDto, 'account', '')) ord_data['account'] = get(createOrderDto, 'account');
    if (get(createOrderDto, 'depositer', '')) ord_data['depositer'] = get(createOrderDto, 'depositer');
    if (get(createOrderDto, 'remitter', '')) ord_data['remitter'] = get(createOrderDto, 'remitter');
    // if (get(createOrderDto, 'clientMemo', '')) ord_data['clientMemo'] = get(createOrderDto, 'clientMemo');
    if (get(createOrderDto, 'adminMemo', '')) ord_data['adminMemo'] = get(createOrderDto, 'adminMemo');
    // 주문 설정
    if (!get(createOrderDto, 'idx', 0)) {
      // 주문 최초 등록
      ord_data['code'] = await this.ordCreateCode();
      ord_data['userAgent'] = req.get('user-agent');
      ord_data['pc_mobile'] = commonUtils.isMobile(createOrderDto['userAgent']);
    } else {
      ord_data['idx'] = createOrderDto['idx'];
      const order = await this.orderRepository.findOne({ idx: ord_data['idx'] });
      if (createOrderDto['status'] == 2 && (''+order['paiedAt']).split(' ')[0] == '0000-00-00') {
        ord_data['paiedAt'] = get(order, 'paiedAt', moment().format('YYYY-MM-DD'));
        // 주문 검증 로직 필요 (함수로 만들기)
      }
    }
    // console.log({ createOrderDto });


    // 상품 및 옵션 정보 가져오기
    const po = await this.productOptionService.findIdx(+createOrderDto['productOptionIdx']);
    // console.log({ po });

    // 회원 주문인 경우 회원 정보 가져오기
    let user = null;
    if (get(createOrderDto, 'userIdx', '')) {
      user = await this.userService.findIdx(+createOrderDto['userIdx']);
      ord_data['userIdx'] = user;
    }

    // 주문 수량 체크 기능 필요 (맘스테이는 필요 없음)

    const order_data = await this.orderRepository.create(ord_data);
    const order = await this.orderRepository.save(order_data);

    // 주문 상품 설정 기능 작업중
    // 추후 주문 상품을 배열로 전달 (한 주문에 여러 주문 상품을 처리하는 경우에 작업 필요)
    const orderProduct = await this.orderProductService.createOrderProduct(order, po, createOrderDto);
    // total 주문 설정 기능 필요
    // 주문 상품 배열 처리시 total 주문 정보는 주문 상품의 총합으로 처리 필요
    await this.ordertotalService.orderTotaLcreate(order, orderProduct);

    return { order, orderProduct };
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
