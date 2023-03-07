import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isArray, map, reduce, values } from 'lodash';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { commonUtils } from 'src/common/common.utils';
import { ProductService } from 'src/product/product.service';
import { ProductOptionService } from 'src/product-option/product-option.service';
import { UsersService } from 'src/users/users.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { OrderTotalService } from 'src/order-total/order-total.service';
import { IamportService } from 'src/iamport/iamport.service';
import { PgDataService } from 'src/pg-data/pg-data.service';

import * as moment from 'moment';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
    private readonly productService: ProductService,
    private readonly usersService: UsersService,
    private readonly productOptionService: ProductOptionService,
    private readonly userService: UsersService,
    private readonly orderProductService: OrderProductService,
    private readonly ordertotalService: OrderTotalService,
    private readonly iamportService: IamportService,
    private readonly pgDataService: PgDataService,
  ) { }

  async create(userInfo: UsersEntity, createOrderDto: CreateOrderDto, req) {

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
      if (order['status'] >= 1) {
        throw new BadRequestException('이미 처리된 주문입니다.');
      }
      if (createOrderDto['status'] == 2 && ('' + order['paiedAt']).split(' ')[0] == '0000-00-00') {
        if (!get(createOrderDto, 'imp_uid', '')) {
          throw new NotFoundException('imp_uid 정보가 없습니다.');
        }
        // 주문 검증
        const pg_data = await this.orderVerification(createOrderDto);
        // pg data 저장
        await this.pgDataService.create(order['code'], pg_data);

        // 결제 시간
        ord_data['paiedAt'] = moment(pg_data['paid_at']).format('YYYY-MM-DD HH:mm:ss');
      }
    }
    // console.log({ createOrderDto });


    // 상품 및 옵션 정보 가져오기
    const po = await this.productOptionService.findIdx(+createOrderDto['productOptionIdx']);
    // console.log({ po });

    // 회원 주문인 경우 회원 정보 가져오기
    ord_data['user'] = await this.userService.findId(get(userInfo, 'id'));

    // 주문 수량 체크 기능 필요 (맘스테이는 필요 없음)

    const orderEntity = await this.orderRepository.create(ord_data);
    let order = await this.orderRepository.save(orderEntity);
    order = await this.findOneIdx(order['idx']);

    // 주문 상품 설정 기능 작업중
    // 추후 주문 상품을 배열로 전달 (한 주문에 여러 주문 상품을 처리하는 경우에 작업 필요)
    const { orderProduct, priceInfo } = await this.orderProductService.createOrderProduct(order, po, createOrderDto);
    // total 주문 설정 기능 필요
    // 주문 상품 배열 처리시 total 주문 정보는 주문 상품의 총합으로 처리 필요
    await this.ordertotalService.orderTotalCreate(order, orderProduct);

    return { order, orderProduct, po, priceInfo };
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

  // 게스트 결제 내역 리스트
  async guestFindAll(userInfo: UsersEntity, options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;

    const user = await this.usersService.findId(userInfo.id);

    const where = commonUtils.searchSplit(search);

    where['status'] = get(where, 'status', values(commonUtils.getStatus(['order_status'])));

    const alias = 'order';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');
    console.log({ order_by });

    const [results, total] = await this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .where(qb => {
        qb.where('`order`.status IN (:status)', { status: isArray(where['status']) ? where['status'] : [where['status']] });
        get(where, 'code', '')
          && qb.andWhere('`order`.code IN (:code)', { code: isArray(where['code']) ? where['code'] : [where['code']] });
        get(where, 'imp_uid', '')
          && qb.andWhere('`order`.imp_uid IN (:imp_uid)', { imp_uid: isArray(where['imp_uid']) ? where['imp_uid'] : [where['imp_uid']] });
        get(where, 'payment', '')
          && qb.andWhere('`order`.payment IN (:payment)', { payment: isArray(where['payment']) ? where['payment'] : [where['payment']] });
        get(where, 'clientName', '')
          && qb.andWhere('`order`.clientName IN (:clientName)', { clientName: isArray(where['clientName']) ? where['clientName'] : [where['clientName']] });
        get(where, 'bank', '')
          && qb.andWhere('`order`.bank IN (:bank)', { bank: isArray(where['bank']) ? where['bank'] : [where['bank']] });
        get(where, 'account', '')
          && qb.andWhere('`order`.account IN (:account)', { account: isArray(where['account']) ? where['account'] : [where['account']] });
        get(where, 'depositer', '')
          && qb.andWhere('`order`.depositer IN (:depositer)', { depositer: isArray(where['depositer']) ? where['depositer'] : [where['depositer']] });
        get(where, 'remitter', '')
          && qb.andWhere('`order`.remitter IN (:remitter)', { remitter: isArray(where['remitter']) ? where['remitter'] : [where['remitter']] });
        if (user['group']['id'] == 'guest') {
          qb.andWhere('`user`.idx = :userIdx', { userIdx: user['idx'] });
        }
      })
      .orderBy(order_by)
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const data = new Pagination({
      results,
      total,
    });

    return { data }
  }

  // 호스트 결제 내역 리스트
  async hostFindAll(userInfo: UsersEntity, options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;

    const user = await this.usersService.findId(userInfo.id);

    const where = commonUtils.searchSplit(search);

    where['status'] = get(where, 'status', values(commonUtils.getStatus(['order_status'])));

    const alias = 'order';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');
    console.log({ order_by });

    const [results, total] = await this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('product.user', 'user')
      .where(qb => {
        qb.where('`order`.status IN (:status)', { status: isArray(where['status']) ? where['status'] : [where['status']] });
        get(where, 'code', '')
          && qb.andWhere('`order`.code IN (:code)', { code: isArray(where['code']) ? where['code'] : [where['code']] });
        get(where, 'imp_uid', '')
          && qb.andWhere('`order`.imp_uid IN (:imp_uid)', { imp_uid: isArray(where['imp_uid']) ? where['imp_uid'] : [where['imp_uid']] });
        get(where, 'payment', '')
          && qb.andWhere('`order`.payment IN (:payment)', { payment: isArray(where['payment']) ? where['payment'] : [where['payment']] });
        get(where, 'clientName', '')
          && qb.andWhere('`order`.clientName IN (:clientName)', { clientName: isArray(where['clientName']) ? where['clientName'] : [where['clientName']] });
        get(where, 'bank', '')
          && qb.andWhere('`order`.bank IN (:bank)', { bank: isArray(where['bank']) ? where['bank'] : [where['bank']] });
        get(where, 'account', '')
          && qb.andWhere('`order`.account IN (:account)', { account: isArray(where['account']) ? where['account'] : [where['account']] });
        get(where, 'depositer', '')
          && qb.andWhere('`order`.depositer IN (:depositer)', { depositer: isArray(where['depositer']) ? where['depositer'] : [where['depositer']] });
        get(where, 'remitter', '')
          && qb.andWhere('`order`.remitter IN (:remitter)', { remitter: isArray(where['remitter']) ? where['remitter'] : [where['remitter']] });
        if (user['group']['id'] == 'host') {
          qb.andWhere('`user`.idx = :userIdx', { userIdx: user['idx'] });
        }
      })
      .orderBy(order_by)
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const data = new Pagination({
      results,
      total,
    });

    return { data }
  }

  async findOneIdxByUser(userInfo: UsersEntity, idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const user = await this.usersService.findId(userInfo['id']);
    const order = await this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('product_option', 'productOption', '`productOption`.idx=`orderProduct`.productOptionIdx')
      .leftJoinAndSelect('product', 'product', '`product`.idx=`productOption`.productIdx')
      .where(qb => {
        qb.where('`order`.idx = :idx', { idx: idx });
        if (['host', 'guest'].includes(user['group']['id'])) {
          qb.andWhere('`user`.idx = :userIdx', { userIdx: user['idx'] });
        }
      })
      .getOne();
    if (!get(order, 'idx', '')) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }

    return { order };
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const order = await this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('product_option', 'productOption', '`productOption`.idx=`orderProduct`.productOptionIdx')
      .leftJoinAndSelect('product', 'product', '`product`.idx=`productOption`.productIdx')
      .where(qb => {
        qb.where('`order`.idx = :idx', { idx: idx });
      })
      .getOne();
    if (!get(order, 'idx', '')) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }

    return order;
  }

  async findOneCode(code: string) {
    if (!code) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const order = await this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('product_option', 'productOption', '`productOption`.idx=`orderProduct`.productOptionIdx')
      .leftJoinAndSelect('product', 'product', '`product`.idx=`productOption`.productIdx')
      .where(qb => {
        qb.where('`order`.code = :code', { code: code });
      })
      .getOne();
    if (!get(order, 'idx', '')) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }
    return { order };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async guestOrderCancel(code: string, userInfo: UsersEntity, updateOrderDto: UpdateOrderDto) {
    if (!code) {
      throw new NotFoundException('취소할 정보가 없습니다.');
    }

    // 게스트 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));

    // 주문 및 주문관련 정보 가져오기
    const order = await this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('product_option', 'productOption', '`productOption`.idx=`orderProduct`.productOptionIdx')
      .leftJoinAndSelect('product', 'product', '`product`.idx=`productOption`.productIdx')
      .where(qb => {
        qb.where('`user`.idx = :userIdx', { userIdx: user['idx'] });
        qb.andWhere('`order`.code = :code', { code: code });
      })
      .getOne();

    if (!get(order, 'idx', '')) {
      throw new NotFoundException('취소할 주문이 없습니다.');
    }

    // 취소 사유
    const cancelReason = '게스트 취소';
    // 취소 처리
    this.cancelProcess(order, cancelReason);

    // 호스트 알림 발송 기능 필요
  }

  async hostOrderApproval(code: string, userInfo: UsersEntity, updateOrderDto: UpdateOrderDto) {
    if (!code || !get(updateOrderDto, 'status', '')) {
      throw new NotFoundException('변경할 정보가 없습니다.');
    }
    // 호스트 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));

    // 주문 및 주문 정보 가져오기
    const order = await this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('product_option', 'productOption', '`productOption`.idx=`orderProduct`.productOptionIdx')
      .leftJoinAndSelect('product', 'product', '`product`.idx=`productOption`.productIdx')
      .leftJoinAndSelect('product.user', 'user')
      .where(qb => {
        qb.where('`user`.idx = :userIdx', { userIdx: user['idx'] });
        qb.andWhere('`order`.code = :code', { code: code });
      })
      .getOne();

    if (!get(order, 'idx', '')) {
      throw new NotFoundException('변경할 주문이 없습니다.');
    }

    // 주문 배송중(호스트 승인) 상태 변경
    const shipping_status = commonUtils.getStatus(['order_status', 'shipping']);
    // 주문 취소 상태 변경
    await this.statusChange(order['idx'], shipping_status);
    // 주문 상품 취소 상태 변경
    await this.orderProductService.statusChange(order['idx'], shipping_status);

    // 게스트 알림 발송 기능 필요
  }

  async hostOrderCancel(code: string, userInfo: UsersEntity, updateOrderDto: UpdateOrderDto) {
    if (!code || !get(updateOrderDto, 'status', '')) {
      throw new NotFoundException('변경할 정보가 없습니다.');
    }
    // 호스트 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));

    // 주문 및 주문 정보 가져오기
    const order = await this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('product_option', 'productOption', '`productOption`.idx=`orderProduct`.productOptionIdx')
      .leftJoinAndSelect('product', 'product', '`product`.idx=`productOption`.productIdx')
      .leftJoinAndSelect('product.user', 'user')
      .where(qb => {
        qb.where('`user`.idx = :userIdx', { userIdx: user['idx'] });
        qb.andWhere('`order`.code = :code', { code: code });
      })
      .getOne();

    if (!get(order, 'idx', '')) {
      throw new NotFoundException('변경할 주문이 없습니다.');
    }

    // 취소 사유
    const cancelReason = '호스트 취소(' + get(updateOrderDto, 'cancelReason', '') + ')';

    // 취소 처리
    this.cancelProcess(order, cancelReason);

    // 게스트 알림 발송 기능 필요
  }

  // 취소 처리
  async cancelProcess(order, cancelReason) {

    // 취소 금액 계산
    const cancelPrice = reduce(order.orderProduct, (o, o1) => {
      return o['payPrice'] + o1['payPrice'];
    }, 0);
    // 취소완료 상태 (8)
    const cancel_status = commonUtils.getStatus(['order_status', 'cancellationCompleted']);

    // 결제 내역 취소
    // 결제 금액 0원 설정시 전액 취소
    await this.iamportService.paymentCancel(order['imp_uid'], cancelPrice, cancelReason);
    // 주문 취소 상태 변경
    await this.statusChange(order['idx'], cancel_status);
    // 주문 상품 취소 상태 변경
    await this.orderProductService.statusChange(order['idx'], cancel_status);
    // 주문 상품 가격 정보 변경
    await this.orderProductService.cancelPrice(order['idx'], cancelPrice);
    // 주문 토탈 가격 정보 변경
    await this.ordertotalService.priceChange(order['idx'], cancelPrice);
  }

  async statusChange(idx: number, status: number) {
    await this.orderRepository.createQueryBuilder()
      .update(OrderEntity)
      .set({ status: status })
      .where(" idx IN :idx", { idx: idx })
      .execute()
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  // 주문 검증
  async orderVerification(createOrderDto: CreateOrderDto) {
    const { response } = await this.iamportService.getPaymentByImpUid(createOrderDto['imp_uid']);
    const result = { status: true, message: '' };

    // 결제 금액과 DB에 저장될 금액이 동일한지 체크
    if (response['amount'] != createOrderDto['price']) {
      result['status'] = false;
      result['message'] = '실 결제 정보와 다름';
    }

    if (!result['status']) {
      await this.iamportService.paymentCancel(createOrderDto['imp_uid'], response['amount'], result['message']);
      throw new NotAcceptableException(result['message']);
    }

    return response;
  }
}
