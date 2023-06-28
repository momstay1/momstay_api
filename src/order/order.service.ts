import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isArray, isEmpty, map, reduce, values } from 'lodash';
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
import { ExcelService } from 'src/excel/excel.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { PushNotificationService } from 'src/push-notification/push-notification.service';

import * as moment from 'moment';
import { SettingsService } from 'src/settings/settings.service';
import { EmailService } from 'src/email/email.service';
import { MessageService } from 'src/message/message.service';

let order_status;
let momstay_url;
let guest_order_url;
let host_order_url;
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private readonly productService: ProductService,
    private readonly usersService: UsersService,
    private readonly productOptionService: ProductOptionService,
    private readonly userService: UsersService,
    private readonly orderProductService: OrderProductService,
    private readonly ordertotalService: OrderTotalService,
    private readonly iamportService: IamportService,
    private readonly pgDataService: PgDataService,
    private readonly pushNotiService: PushNotificationService,
    private readonly settingsService: SettingsService,
    private readonly excelService: ExcelService,
    private readonly emailService: EmailService,
    private readonly messageService: MessageService,
  ) {
    order_status = commonUtils.getStatus('order_status');
    momstay_url = commonUtils.getStatus('momstay_url');
    guest_order_url = momstay_url + '/mypage/order/details/';
    host_order_url = momstay_url + '/host/order/details/';
  }

  async create(userInfo: UsersEntity, createOrderDto: CreateOrderDto, req) {
    const ord_data = {};
    if (get(createOrderDto, 'status', ''))
      ord_data['status'] = get(createOrderDto, 'status');
    if (get(createOrderDto, 'imp_uid', ''))
      ord_data['imp_uid'] = get(createOrderDto, 'imp_uid');
    if (get(createOrderDto, 'billingKey', ''))
      ord_data['billingKey'] = get(createOrderDto, 'billingKey');
    if (get(createOrderDto, 'payment', ''))
      ord_data['payment'] = get(createOrderDto, 'payment');
    if (get(createOrderDto, 'clientName', ''))
      ord_data['clientName'] = get(createOrderDto, 'clientName');
    if (get(createOrderDto, 'clientEmail', ''))
      ord_data['clientEmail'] = get(createOrderDto, 'clientEmail');
    if (get(createOrderDto, 'clientPhone1', ''))
      ord_data['clientPhone1'] = get(createOrderDto, 'clientPhone1');
    if (get(createOrderDto, 'clientPhone2', ''))
      ord_data['clientPhone2'] = get(createOrderDto, 'clientPhone2');
    if (get(createOrderDto, 'inPostCode', ''))
      ord_data['inPostCode'] = get(createOrderDto, 'inPostCode');
    if (get(createOrderDto, 'inAddr1', ''))
      ord_data['inAddr1'] = get(createOrderDto, 'inAddr1');
    if (get(createOrderDto, 'inAddr2', ''))
      ord_data['inAddr2'] = get(createOrderDto, 'inAddr2');
    if (get(createOrderDto, 'shipName', ''))
      ord_data['shipName'] = get(createOrderDto, 'shipName');
    if (get(createOrderDto, 'shipPhone1', ''))
      ord_data['shipPhone1'] = get(createOrderDto, 'shipPhone1');
    if (get(createOrderDto, 'shipPhone2', ''))
      ord_data['shipPhone2'] = get(createOrderDto, 'shipPhone2');
    if (get(createOrderDto, 'shipArea', ''))
      ord_data['shipArea'] = get(createOrderDto, 'shipArea');
    if (get(createOrderDto, 'shipPostCode', ''))
      ord_data['shipPostCode'] = get(createOrderDto, 'shipPostCode');
    if (get(createOrderDto, 'shipNation', ''))
      ord_data['shipNation'] = get(createOrderDto, 'shipNation');
    if (get(createOrderDto, 'shipState', ''))
      ord_data['shipState'] = get(createOrderDto, 'shipState');
    if (get(createOrderDto, 'shipCity', ''))
      ord_data['shipCity'] = get(createOrderDto, 'shipCity');
    if (get(createOrderDto, 'shipAddr1', ''))
      ord_data['shipAddr1'] = get(createOrderDto, 'shipAddr1');
    if (get(createOrderDto, 'shipAddr2', ''))
      ord_data['shipAddr2'] = get(createOrderDto, 'shipAddr2');
    if (get(createOrderDto, 'bank', ''))
      ord_data['bank'] = get(createOrderDto, 'bank');
    if (get(createOrderDto, 'account', ''))
      ord_data['account'] = get(createOrderDto, 'account');
    if (get(createOrderDto, 'depositer', ''))
      ord_data['depositer'] = get(createOrderDto, 'depositer');
    if (get(createOrderDto, 'remitter', ''))
      ord_data['remitter'] = get(createOrderDto, 'remitter');
    // if (get(createOrderDto, 'clientMemo', '')) ord_data['clientMemo'] = get(createOrderDto, 'clientMemo');
    if (get(createOrderDto, 'adminMemo', ''))
      ord_data['adminMemo'] = get(createOrderDto, 'adminMemo');

    // 주문 설정
    if (!get(createOrderDto, 'idx', 0)) {
      // 주문 최초 등록
      ord_data['code'] = await this.ordCreateCode();
      ord_data['userAgent'] = req.get('user-agent');
      ord_data['pc_mobile'] = commonUtils.isMobile(createOrderDto['userAgent']);
      ord_data['paiedAt'] = '';
    } else {
      ord_data['idx'] = createOrderDto['idx'];
      const order = await this.orderRepository.findOne({
        idx: ord_data['idx'],
      });
      if (order['status'] >= 1) {
        throw new BadRequestException(
          'order.service.create: 이미 처리된 주문입니다.',
        );
      }
      if (createOrderDto['status'] == 2 && order['paiedAt'] == '') {
        if (!get(createOrderDto, 'imp_uid', '')) {
          throw new NotFoundException(
            'order.service.create: imp_uid 정보가 없습니다.',
          );
        }
        // 주문 검증
        order['imp_uid'] = createOrderDto.imp_uid;
        const pg_data = await this.orderVerification(order);
        console.log({ pg_data });
        // pg data 저장
        // await this.pgDataService.create(order['code'], pg_data);

        // 결제 시간
        ord_data['paiedAt'] = moment(pg_data['paid_at']).format(
          'YYYY-MM-DD HH:mm:ss',
        );
      }
    }
    // console.log({ createOrderDto });

    // 상품 및 옵션 정보 가져오기
    const po = await this.productOptionService.findIdx(
      +createOrderDto['productOptionIdx'],
    );
    // console.log({ po });

    // 회원 주문인 경우 회원 정보 가져오기
    ord_data['user'] = await this.userService.findId(get(userInfo, 'id'));

    // 주문 수량 체크 기능 필요 (맘스테이는 필요 없음)
    console.log({ ord_data });
    console.log(ord_data['paiedAt']);
    const orderEntity = await this.orderRepository.create(ord_data);
    let order = await this.orderRepository.save(orderEntity);
    order = await this.findOneIdx(order['idx']);

    // 주문 상품 설정 기능 작업중
    // 추후 주문 상품을 배열로 전달 (한 주문에 여러 주문 상품을 처리하는 경우에 작업 필요)
    const { orderProduct, priceInfo } =
      await this.orderProductService.createOrderProduct(
        order,
        po,
        createOrderDto,
      );
    // total 주문 설정 기능 필요
    // 주문 상품 배열 처리시 total 주문 정보는 주문 상품의 총합으로 처리 필요
    await this.ordertotalService.orderTotalCreate(order, orderProduct);

    // 호스트에게 push 알림 발송
    const { user } = get(po, ['product']);
    if (get(user, ['device', 'token'], '')) {
      await this.pushNotiService.guestOrderPush(user, po);
    }

    // 주문 관련 메일
    await this.guestOrderMail(order.idx, '');

    // 알림톡 기능 (게스트에게 결제 완료 알림톡)
    const settings = await this.settingsService.find('alimtalk_admin_mobile');
    const alimtalk_data = await this.settingsAlimtalkData(order);
    if (order.user.language == 'ko') {
      alimtalk_data.link = alimtalk_data.guest_link;
      await this.messageService.send([order.user.phone], 'guest_ordercomplete', alimtalk_data);
    }
    // 알림톡 기능 (호스트에게 결제 완료 알림톡)
    alimtalk_data.link = alimtalk_data.host_link;
    await this.messageService.send(
      [user.phone, settings.alimtalk_admin_mobile.set_value],
      'host_ordercomplete',
      alimtalk_data
    );

    return { order, orderProduct, po, priceInfo };
  }

  async iamportNoti(iamportNoti, req, res) {
    // 데이터 확인 로그
    console.log({ iamportNoti });
    try {
      // iamportNoti
      // imp_uid: 결제 번호
      // merchant_uid: 주문번호
      // status: 결제 결과
      // status: paid // 결제가 승인되었을 때 or 가상계좌에 결제 금액이 입금되었을 때
      // status: ready // 가상계좌가 발급되었을 때
      // status: cancelled // 관리자 콘솔에서 결제 취소 되었을 때

      // 아임포트 웹훅 검증 (요청한 아이피로 검증)
      if (!this.iamportService.iamportIPVerification(req.ip)) {
        res.send({ status: "forgery", message: "위조된 결제시도" });
        throw new BadRequestException(
          'order.service.iamportNoti: 잘못된 요청입니다.',
        );
      }

      // iamport(portone) 결제 정보 조회
      const { response } = await this.iamportService.getPaymentByImpUid(iamportNoti.imp_uid);
      // DB 결제 정보 조회
      const order = await this.findOneCode(iamportNoti.merchant_uid);

      // 상태 cancelled 인 경우 결제 취소
      if (iamportNoti.status == 'cancelled') {
        const message = '관리자 콘솔에서 주문 취소';
        // 취소 처리
        await this.cancelProcess(order, message, 'portone');
      } else {
        if (iamportNoti.status == 'ready') {
          // 가상계좌 발급 안내 처리

          // 가상계좌 문자 발송
          res.send({ status: "vbankIssued", message: "가상계좌 발급 성공" });
        } else if (iamportNoti.status == 'paid' && order['status'] == 2 && order['paiedAt'] == '') {

          if (order.imp_uid != iamportNoti.imp_uid) {
            res.send({ status: "forgery", message: "위조된 결제시도" });
            throw new BadRequestException(
              'order.service.iamportNoti: 잘못된 요청입니다.',
            );
          }
          // 결제 검증
          const pg_data = await this.orderVerification(order);
          // 결제 시간
          order.paiedAt = moment(pg_data['paid_at']).format(
            'YYYY-MM-DD HH:mm:ss',
          );

          await this.paymentProcessing(order);
          // 결제 완료 처리
          res.send({ status: "success", message: "일반 결제 성공" });
        }
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async paymentProcessing(order_data: OrderEntity) {

    // 상품 및 옵션 정보 가져오기
    const po = await this.productOptionService.findIdx(
      order_data.orderProduct[0].productOption.idx,
    );

    // if (order_data?.user?.idx) {
    //   // 회원 주문인 경우 회원 정보 가져오기
    //   order_data['user'] = await this.userService.findId(order_data.user.idx);
    // }

    // 주문 수량 체크 기능 필요 (맘스테이는 필요 없음)

    const orderEntity = await this.orderRepository.create(order_data);
    let order = await this.orderRepository.save(orderEntity);
    order = await this.findOneIdx(order.idx);

    // 주문 상품 설정 기능 작업중
    // 추후 주문 상품을 배열로 전달 (한 주문에 여러 주문 상품을 처리하는 경우에 작업 필요)
    const { orderProduct } =
      await this.orderProductService.createOrderProduct(
        order,
        po,
        {
          orderProductIdx: order_data.orderProduct[0].idx,
          startAt: order_data.orderProduct[0].startAt,
          endAt: order_data.orderProduct[0].endAt,
        },
      );
    // total 주문 설정 기능 필요
    // 주문 상품 배열 처리시 total 주문 정보는 주문 상품의 총합으로 처리 필요
    await this.ordertotalService.orderTotalCreate(order, orderProduct);
  }

  async ordCreateCode() {
    const code =
      moment().format('YYMMDD') + commonUtils.createCode().toUpperCase();
    const isCode = await this.orderRepository.findOne({
      where: { code: code },
    });

    if (isCode) {
      this.ordCreateCode();
    } else {
      return code;
    }
  }

  // 관리자 결제 내역 리스트
  async adminFindAll(
    userInfo: UsersEntity,
    options: PaginationOptions,
    search: string[],
    order: string,
  ) {
    const { take, page } = options;

    const user = await this.usersService.findId(userInfo.id);

    const where = commonUtils.searchSplit(search);

    where['status'] = get(
      where,
      'status',
      values(commonUtils.getStatus(['order_status'])),
    );

    const alias = 'order';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(
      order_by,
      alias + '.createdAt',
      'DESC',
    );
    console.log({ order_by });

    const [results, total] = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'guestUser')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('product.user', 'hostUser')
      .where((qb) => {
        qb.where('`order`.status IN (:status)', {
          status: isArray(where['status'])
            ? where['status']
            : [where['status']],
        });
        get(where, 'code', '') &&
          qb.andWhere('`order`.code IN (:code)', {
            code: isArray(where['code']) ? where['code'] : [where['code']],
          });
        get(where, 'imp_uid', '') &&
          qb.andWhere('`order`.imp_uid IN (:imp_uid)', {
            imp_uid: isArray(where['imp_uid'])
              ? where['imp_uid']
              : [where['imp_uid']],
          });
        get(where, 'payment', '') &&
          qb.andWhere('`order`.payment IN (:payment)', {
            payment: isArray(where['payment'])
              ? where['payment']
              : [where['payment']],
          });
        get(where, 'clientName', '') &&
          qb.andWhere('`guestUser`.name LIKE :name', {
            name: '%' + where['clientName'] + '%',
          });
        get(where, 'clientId', '') &&
          qb.andWhere('`guestUser`.id LIKE :clientId', {
            clientId: '%' + where['clientId'] + '%',
          });
        get(where, 'productTitle', '') &&
          qb.andWhere('`orderProduct`.title LIKE :productTitle', {
            productTitle: '%' + where['productTitle'] + '%',
          });
        get(where, 'bank', '') &&
          qb.andWhere('`order`.bank IN (:bank)', {
            bank: isArray(where['bank']) ? where['bank'] : [where['bank']],
          });
        get(where, 'account', '') &&
          qb.andWhere('`order`.account IN (:account)', {
            account: isArray(where['account'])
              ? where['account']
              : [where['account']],
          });
        get(where, 'depositer', '') &&
          qb.andWhere('`order`.depositer IN (:depositer)', {
            depositer: isArray(where['depositer'])
              ? where['depositer']
              : [where['depositer']],
          });
        get(where, 'remitter', '') &&
          qb.andWhere('`order`.remitter IN (:remitter)', {
            remitter: isArray(where['remitter'])
              ? where['remitter']
              : [where['remitter']],
          });
        get(where, 'min_paiedAt', '') &&
          qb.andWhere('`order`.paiedAt >= :min_paiedAt', {
            min_paiedAt: where['min_paiedAt'],
          });
        get(where, 'max_paiedAt', '') &&
          qb.andWhere('`order`.paiedAt <= :max_paiedAt', {
            max_paiedAt: where['max_paiedAt'],
          });
      })
      .orderBy(order_by)
      .skip(take * (page - 1) || 0)
      .take(take || 10)
      .getManyAndCount();

    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data };
  }

  // 게스트 결제 내역 리스트
  async guestFindAll(
    userInfo: UsersEntity,
    options: PaginationOptions,
    search: string[],
    order: string,
  ) {
    const { take, page } = options;

    const user = await this.usersService.findId(userInfo.id);

    const where = commonUtils.searchSplit(search);

    where['status'] = get(
      where,
      'status',
      values(commonUtils.getStatus(['order_status'])),
    );

    const alias = 'order';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(
      order_by,
      alias + '.createdAt',
      'DESC',
    );
    console.log({ order_by });

    const [results, total] = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'guestUser')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('product.user', 'hostUser')
      .where((qb) => {
        qb.where('`order`.status IN (:status)', {
          status: isArray(where['status'])
            ? where['status']
            : [where['status']],
        });
        get(where, 'code', '') &&
          qb.andWhere('`order`.code IN (:code)', {
            code: isArray(where['code']) ? where['code'] : [where['code']],
          });
        get(where, 'imp_uid', '') &&
          qb.andWhere('`order`.imp_uid IN (:imp_uid)', {
            imp_uid: isArray(where['imp_uid'])
              ? where['imp_uid']
              : [where['imp_uid']],
          });
        get(where, 'payment', '') &&
          qb.andWhere('`order`.payment IN (:payment)', {
            payment: isArray(where['payment'])
              ? where['payment']
              : [where['payment']],
          });
        get(where, 'clientName', '') &&
          qb.andWhere('`order`.clientName IN (:clientName)', {
            clientName: isArray(where['clientName'])
              ? where['clientName']
              : [where['clientName']],
          });
        get(where, 'bank', '') &&
          qb.andWhere('`order`.bank IN (:bank)', {
            bank: isArray(where['bank']) ? where['bank'] : [where['bank']],
          });
        get(where, 'account', '') &&
          qb.andWhere('`order`.account IN (:account)', {
            account: isArray(where['account'])
              ? where['account']
              : [where['account']],
          });
        get(where, 'depositer', '') &&
          qb.andWhere('`order`.depositer IN (:depositer)', {
            depositer: isArray(where['depositer'])
              ? where['depositer']
              : [where['depositer']],
          });
        get(where, 'remitter', '') &&
          qb.andWhere('`order`.remitter IN (:remitter)', {
            remitter: isArray(where['remitter'])
              ? where['remitter']
              : [where['remitter']],
          });
        if (['host', 'guest'].includes(user['group']['id'])) {
          // 자신의 주문 내역만 확인 가능
          qb.andWhere('`guestUser`.idx = :userIdx', { userIdx: user['idx'] });
        }
      })
      .orderBy(order_by)
      .skip(take * (page - 1) || 0)
      .take(take || 10)
      .getManyAndCount();

    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data };
  }

  // 호스트 결제 내역 리스트
  async hostFindAll(
    userInfo: UsersEntity,
    options: PaginationOptions,
    search: string[],
    order: string,
  ) {
    const { take, page } = options;

    const user = await this.usersService.findId(userInfo.id);

    const where = commonUtils.searchSplit(search);

    where['status'] = get(
      where,
      'status',
      values(commonUtils.getStatus(['order_status'])),
    );

    const alias = 'order';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(
      order_by,
      alias + '.createdAt',
      'DESC',
    );
    console.log({ order_by });

    const [results, total] = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'guestUser')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('product.user', 'hostUser')
      .where((qb) => {
        qb.where('`order`.status IN (:status)', {
          status: isArray(where['status'])
            ? where['status']
            : [where['status']],
        });
        get(where, 'code', '') &&
          qb.andWhere('`order`.code IN (:code)', {
            code: isArray(where['code']) ? where['code'] : [where['code']],
          });
        get(where, 'imp_uid', '') &&
          qb.andWhere('`order`.imp_uid IN (:imp_uid)', {
            imp_uid: isArray(where['imp_uid'])
              ? where['imp_uid']
              : [where['imp_uid']],
          });
        get(where, 'payment', '') &&
          qb.andWhere('`order`.payment IN (:payment)', {
            payment: isArray(where['payment'])
              ? where['payment']
              : [where['payment']],
          });
        get(where, 'clientName', '') &&
          qb.andWhere('`order`.clientName IN (:clientName)', {
            clientName: isArray(where['clientName'])
              ? where['clientName']
              : [where['clientName']],
          });
        get(where, 'bank', '') &&
          qb.andWhere('`order`.bank IN (:bank)', {
            bank: isArray(where['bank']) ? where['bank'] : [where['bank']],
          });
        get(where, 'account', '') &&
          qb.andWhere('`order`.account IN (:account)', {
            account: isArray(where['account'])
              ? where['account']
              : [where['account']],
          });
        get(where, 'depositer', '') &&
          qb.andWhere('`order`.depositer IN (:depositer)', {
            depositer: isArray(where['depositer'])
              ? where['depositer']
              : [where['depositer']],
          });
        get(where, 'remitter', '') &&
          qb.andWhere('`order`.remitter IN (:remitter)', {
            remitter: isArray(where['remitter'])
              ? where['remitter']
              : [where['remitter']],
          });
        if (user['group']['id'] == 'host') {
          qb.andWhere('`hostUser`.idx = :userIdx', { userIdx: user['idx'] });
        }
      })
      .orderBy(order_by)
      .skip(take * (page - 1) || 0)
      .take(take || 10)
      .getManyAndCount();

    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data };
  }

  async findOneIdxByAdmin(idx: number) {
    if (!idx) {
      throw new NotFoundException(
        'order.service.findOneIdxByAdmin: 잘못된 정보 입니다.',
      );
    }
    const order = await this.orderRepository.findOne({
      where: { idx: idx },
      relations: [
        'user',
        'orderProduct',
        'orderProduct.productOption',
        'orderProduct.productOption.product',
        'orderProduct.productOption.product.user',
      ],
    });
    if (!get(order, 'idx', '')) {
      throw new NotFoundException(
        'order.service.findOneIdxByAdmin: 정보를 찾을 수 없습니다.',
      );
    }

    return { order };
  }

  async findOneIdxByGuest(userInfo: UsersEntity, idx: number) {
    if (!idx) {
      throw new NotFoundException(
        'order.service.findOneIdxByGuest: 잘못된 정보 입니다.',
      );
    }
    const user = await this.usersService.findId(userInfo['id']);
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'guestUser')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('product.user', 'hostUser')
      .where((qb) => {
        qb.where('`order`.idx = :idx', { idx: idx });
        if (!['root', 'admin'].includes(user['group']['id'])) {
          qb.andWhere('`guestUser`.idx = :userIdx', { userIdx: user['idx'] });
        }
      })
      .getOne();
    if (!get(order, 'idx', '')) {
      throw new NotFoundException(
        'order.service.findOneIdxByGuest: 정보를 찾을 수 없습니다.',
      );
    }

    return { order };
  }

  async findOneIdxByHost(userInfo: UsersEntity, idx: number) {
    if (!idx) {
      throw new NotFoundException(
        'order.service.findOneIdxByHost: 잘못된 정보 입니다.',
      );
    }
    const user = await this.usersService.findId(userInfo['id']);
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'guestUser')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('product.user', 'hostUser')
      .where((qb) => {
        qb.where('`order`.idx = :idx', { idx: idx });
        if (!['root', 'admin'].includes(user['group']['id'])) {
          qb.andWhere('`hostUser`.idx = :userIdx', { userIdx: user['idx'] });
        }
      })
      .getOne();
    if (!get(order, 'idx', '')) {
      throw new NotFoundException(
        'order.service.findOneIdxByHost: 정보를 찾을 수 없습니다.',
      );
    }

    return { order };
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException(
        'order.service.findOneIdx: 잘못된 정보 입니다.',
      );
    }
    const order = await this.orderRepository.findOne({
      where: { idx: idx },
      relations: [
        'user',
        'user.device',
        'orderProduct',
        'orderProduct.productOption',
        'orderProduct.productOption.product',
        'orderProduct.productOption.product.user',
        'orderProduct.productOption.product.user.device',
      ],
    });
    if (!get(order, 'idx', '')) {
      throw new NotFoundException(
        'order.service.findOneIdx: 정보를 찾을 수 없습니다.',
      );
    }

    return order;
  }

  async findOneCode(code: string) {
    if (!code) {
      throw new NotFoundException(
        'order.service.findOneCode: 잘못된 정보 입니다.',
      );
    }
    const order = await this.orderRepository.findOne({
      where: { code: code },
      relations: [
        'user',
        'user.device',
        'orderProduct',
        'orderProduct.productOption',
        'orderProduct.productOption.product',
        'orderProduct.productOption.product.user',
        'orderProduct.productOption.product.user.device',
      ],
    });
    if (!get(order, 'idx', '')) {
      throw new NotFoundException(
        'order.service.findOneIdx: 정보를 찾을 수 없습니다.',
      );
    }

    return order;
  }

  async findOneCodeByNonmember(code: string) {
    if (!code) {
      throw new NotFoundException(
        'order.service.findOneCodeByNonmember: 잘못된 정보 입니다.',
      );
    }
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'guestUser')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('product.user', 'hostUser')
      .where((qb) => {
        qb.where('`order`.code = :code', { code: code });
      })
      .getOne();
    if (!get(order, 'idx', '')) {
      throw new NotFoundException(
        'order.service.findOneCodeByNonmember: 정보를 찾을 수 없습니다.',
      );
    }
    return { order };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async guestOrderCancel(code: string, userInfo: UsersEntity) {
    if (!code) {
      throw new NotFoundException(
        'order.service.guestOrderCancel: 취소할 정보가 없습니다.',
      );
    }

    // 게스트 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));

    // 주문 및 주문관련 정보 가져오기
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .where((qb) => {
        qb.where('`user`.idx = :userIdx', { userIdx: user['idx'] });
        qb.andWhere('`order`.code = :code', { code: code });
      })
      .getOne();

    if (!get(order, 'idx', '')) {
      throw new NotFoundException(
        'order.service.guestOrderCancel: 취소할 주문이 없습니다.',
      );
    }
    const today = moment().format('YYYY-MM-DD');
    const ago20day = moment(order.orderProduct[0].startAt)
      .add(-20, 'day')
      .format('YYYY-MM-DD');
    if (today > ago20day) {
      const site = await this.settingsService.findOne('site_tel');
      throw new NotAcceptableException(
        'order.service.guestOrderCancel: 바로결제 취소가 불가능합니다. 1:1문의 또는 고객센터(' +
        site.set_value +
        ')에 문의해주세요.',
      );
    }

    // 취소 사유
    const cancelReason = 'guest cancel';
    // 주문 관련 메일
    await this.guestOrderMail(order.idx, cancelReason);
    // 취소 처리
    await this.cancelProcess(order, cancelReason);

    // 상품 및 옵션 정보 가져오기
    const po = await this.productOptionService.findIdx(
      +get(order, ['orderProduct', '0', 'productOption', 'idx']),
    );
    const hostUser = get(po, ['product', 'user']);
    if (get(hostUser, ['device', 'token'], '')) {
      await this.pushNotiService.guestOrderCancelPush(hostUser, po);
    }

    // 알림톡 기능 (게스트에게 주문 취소 알림톡)
    const settings = await this.settingsService.find('alimtalk_admin_mobile');
    const alimtalk_data = await this.settingsAlimtalkData(order);
    if (order.user.language == 'ko') {
      alimtalk_data.link = alimtalk_data.guest_link;
      await this.messageService.send([order.user.phone], 'guest_orderguestcancel', alimtalk_data);
    }
    // 알림톡 기능 (호스트 및 관리자에게 주문 취소 알림톡)
    alimtalk_data.link = alimtalk_data.host_link;
    await this.messageService.send(
      [hostUser.phone, settings.alimtalk_admin_mobile.set_value],
      'host_orderguestcancel',
      alimtalk_data
    );
  }

  async hostOrderApproval(code: string, userInfo: UsersEntity) {
    if (!code) {
      throw new NotFoundException(
        'order.service.hostOrderApproval: 변경할 정보가 없습니다.',
      );
    }
    // 호스트 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));

    // 주문 및 주문 정보 가져오기
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('product.user', 'user')
      .where((qb) => {
        qb.andWhere('`order`.code = :code', { code: code });
      })
      .getOne();

    if (['host'].includes(user.group.id)) {
      const userIdx = get(order, ['orderProduct', 0, 'productOption', 'product', 'user', 'idx'], '');
      if (userIdx != user.idx) {
        throw new NotFoundException(
          'order.service.hostOrderApproval: 권한이 없습니다.',
        );
      }
    }
    if (!get(order, 'idx', '')) {
      throw new NotFoundException(
        'order.service.hostOrderApproval: 변경할 주문이 없습니다.',
      );
    }

    // 주문 배송중(호스트 승인) 상태 변경
    const shipping_status = commonUtils.getStatus(['order_status', 'shipping']);
    if (order['status'] == shipping_status) {
      throw new NotAcceptableException(
        'order.service.hostOrderApproval: 이미 승인 처리된 주문입니다.',
      );
    }
    // 메일에 표시할 내용 설정
    const orderMailSendInfo = await this.orderMailSendInfo(order.idx);

    // 주문 취소 상태 변경
    await this.statusChange(order['idx'], shipping_status);
    // 주문 상품 취소 상태 변경
    await this.orderProductService.statusChange(order['idx'], shipping_status);

    // 주문 정보 가져오기
    const orderInfo = await this.findOneIdx(+get(order, ['idx']));
    const guestUser = get(orderInfo, 'user');
    if (get(guestUser, ['device', 'token'], '')) {
      // 게스트에게 바로결제 승인 push 알림 발송
      await this.pushNotiService.hostOrderApprovalPush(guestUser, orderInfo);
    }

    // 주문 관련 메일
    await this.hostOrderMail(orderMailSendInfo, '');

    // 알림톡 기능 (게스트에게 입주 확정 알림톡)
    const settings = await this.settingsService.find('alimtalk_admin_mobile');
    const alimtalk_data = await this.settingsAlimtalkData(order);
    if (order.user.language == 'ko') {
      alimtalk_data.link = alimtalk_data.guest_link;
      await this.messageService.send([order.user.phone], 'guest_orderconfirmed', alimtalk_data);
    }
    // 알림톡 기능 (호스트 및 관리자에게 입주 확정 알림톡)
    alimtalk_data.link = alimtalk_data.host_link;
    await this.messageService.send(
      [user.phone, settings.alimtalk_admin_mobile.set_value],
      'host_orderconfirmed',
      alimtalk_data
    );
  }

  async hostOrderCancel(
    code: string,
    userInfo: UsersEntity,
    updateOrderDto: UpdateOrderDto,
  ) {
    if (!code) {
      throw new NotFoundException(
        'order.service.hostOrderCancel: 변경할 정보가 없습니다.',
      );
    }
    // 호스트 또는 관리자 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));

    // 주문 및 주문 정보 가져오기
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('product.user', 'user')
      .where((qb) => {
        qb.andWhere('`order`.code = :code', { code: code });
      })
      .getOne();

    if (!get(order, 'idx', '')) {
      throw new NotFoundException(
        'order.service.hostOrderCancel: 변경할 주문이 없습니다.',
      );
    }
    if (['host'].includes(user.group.id)) {
      const userIdx = get(order, ['orderProduct', 0, 'productOption', 'product', 'user', 'idx'], '');
      if (userIdx != user.idx) {
        throw new NotFoundException(
          'order.service.hostOrderCancel: 권한이 없습니다.',
        );
      }
      const today = moment().format('YYYY-MM-DD');
      const ago20day = moment(order.orderProduct[0].startAt)
        .add(-20, 'day')
        .format('YYYY-MM-DD');
      if (today > ago20day) {
        const site = await this.settingsService.findOne('site_tel');
        throw new NotAcceptableException(
          'order.service.hostOrderCancel: 바로결제 취소가 불가능합니다. 1:1문의 또는 고객센터(' +
          site.set_value +
          ')에 문의해주세요.',
        );
      }
    }

    // 메일에 표시할 내용 설정
    const orderMailSendInfo = await this.orderMailSendInfo(order.idx);

    // 취소 사유
    const cancelReason = 'host cancel(' + get(updateOrderDto, 'cancelReason', '') + ')';

    // 주문 정보 가져오기
    const orderInfo = await this.findOneIdx(+get(order, ['idx']));
    const guestUser = get(orderInfo, 'user');
    if (get(guestUser, ['device', 'token'], '')) {
      // 게스트에게 바로결제 거절 push 알림 발송
      await this.pushNotiService.hostOrderCancelPush(guestUser, orderInfo);
    }

    // 주문 관련 메일
    if (['root', 'admin'].includes(user.group.id)) {
      await this.adminOrderMail(orderMailSendInfo, 'momstay cancel');
    } else {
      await this.hostOrderMail(orderMailSendInfo, cancelReason);
    }

    // 취소 처리
    await this.cancelProcess(order, cancelReason);

    // 알림톡 기능 (게스트에게 주문 거절 알림톡)
    let guest_message_type = 'guest_orderhostcancel';
    let host_message_type = 'host_orderhostcancel';
    if (commonUtils.isAdmin(user.group.id)) {
      guest_message_type = 'guest_orderadmincancel';
      host_message_type = 'admin_orderadmincancel';
    }
    const settings = await this.settingsService.find('alimtalk_admin_mobile');
    const alimtalk_data = await this.settingsAlimtalkData(order);
    if (order.user.language == 'ko') {
      alimtalk_data.link = alimtalk_data.guest_link;
      await this.messageService.send([order.user.phone], guest_message_type, alimtalk_data);
    }
    // 알림톡 기능 (호스트 및 관리자에게 주문 거절 알림톡)
    alimtalk_data.link = alimtalk_data.host_link;
    await this.messageService.send(
      [user.phone, settings.alimtalk_admin_mobile.set_value],
      host_message_type,
      alimtalk_data
    );
  }

  // 취소 처리
  async cancelProcess(order, cancelReason, portone?) {
    // 취소완료 상태 (8)
    const cancel_status = commonUtils.getStatus([
      'order_status',
      'cancellationCompleted',
    ]);
    if (order['status'] == cancel_status) {
      throw new NotAcceptableException(
        'order.service.cancelProcess: 이미 취소 처리된 주문입니다.',
      );
    }

    // 취소 금액 계산
    const cancelPrice = reduce(
      order.orderProduct,
      (o, o1) => {
        return o + +o1['payPrice'];
      },
      0,
    );
    const cancelPriceEng = reduce(
      order.orderProduct,
      (o, o1) => {
        return o + +o1['payPriceEng'];
      },
      0,
    );

    // 결제 내역 취소
    // 결제 금액 0원 설정시 전액 취소
    if (order['imp_uid'] && !portone) {
      const price = cancelPrice > 0 ? cancelPrice : cancelPriceEng;
      await this.iamportService.paymentCancel(
        order['imp_uid'],
        price,
        cancelReason,
      );
    }
    // 주문 취소 상태 변경
    await this.statusChange(order['idx'], cancel_status);
    // 주문 상품 취소 상태 변경
    await this.orderProductService.statusChange(
      order['idx'],
      cancel_status,
      cancelReason,
    );
    // 주문 상품 가격 정보 변경
    await this.orderProductService.cancelPrice(order['idx'], cancelPrice, cancelPriceEng);
    // 주문 토탈 가격 정보 변경
    await this.ordertotalService.priceChange(order['idx'], cancelPrice, cancelPriceEng);
  }

  async statusChange(idx: number, status: number) {
    await this.orderRepository
      .createQueryBuilder()
      .update(OrderEntity)
      .set({ status: status })
      .where(' idx = :idx', { idx: idx })
      .execute();
  }

  async test(order_idx: string, price: string) {
    // const order = await this.findOneIdx(+order_idx);
    // console.log(order.orderProduct)
    // const cancelPrice = reduce(order.orderProduct, (o, o1) => {
    //   return o + (+o1['payPrice']);
    // }, 0);
    // console.log({ cancelPrice });
    // await this.ordertotalService.priceChange(+order_idx, +price);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  // 주문 메일 발송 데이터
  async orderMailSendInfo(orderIdx: number) {
    const order = await this.findOneIdx(orderIdx);

    const guestUser = order.user;
    const hostUser = order.orderProduct[0].productOption.product.user;

    const lang = commonUtils.langValue(
      guestUser.language == 'ko' ? guestUser.language : 'en'
    );

    let po_title = order.orderProduct[0].productOption['title' + lang];
    // console.log({po_title});
    // let po_title_ko;
    // let po_title_en;
    if (order.orderProduct.length > 1) {
      if (lang == 'ko') {
        po_title = po_title + ' 외 ' + order.orderProduct.length + '건';
      } else {
        po_title = po_title + ' and ' + order.orderProduct.length + ' other case';
      }
    }
    const sendInfo = {
      po_title: po_title,
      product_title: order.orderProduct[0].productOption.product['title' + lang],
      occupancy_date: order.orderProduct[0].startAt,
      eviction_date: order.orderProduct[0].endAt,
      payment: order.orderProduct[0].payPrice, // 장바구니 기능 추가시 order_total 테이블 데이터로 표현
      po_payment: order.orderProduct[0].price, // 장바구니 기능 추가시 order_total 테이블 데이터로 표현
      tax: order.orderProduct[0].taxPrice, // 장바구니 기능 추가시 order_total 테이블 데이터로 표현
      fee: order.orderProduct[0].feePrice, // 장바구니 기능 추가시 order_total 테이블 데이터로 표현
      user_name: guestUser.name,
      phone: guestUser.countryCode + ' ' + guestUser.phone,
      cancel_reason: '',
    };

    if (guestUser.language != 'ko') {
      sendInfo['payment'] = order.orderProduct[0].payPriceEng;
      sendInfo['po_payment'] = order.orderProduct[0].priceEng;
      sendInfo['tax'] = order.orderProduct[0].taxPriceEng;
      sendInfo['fee'] = order.orderProduct[0].feePriceEng;
    }

    const site = await this.settingsService.find('site');

    return {
      order,
      guestUser,
      hostUser,
      sendInfo,
      site
    };
  }

  // 게스트가 이벤트 발생시 메일 발송
  async guestOrderMail(ordIdx: any, cancelReason: string) {
    const {
      order,
      guestUser,
      hostUser,
      sendInfo,
      site
    } = await this.orderMailSendInfo(ordIdx);
    sendInfo.cancel_reason = cancelReason;


    const status = commonUtils.getStatus([
      'order_status',
    ]);
    let code;
    if (order.status == status.paymentCompleted) {
      code = 'payment';
    }
    if (cancelReason != '') {
      code = 'guest_cancel';
    }

    if (code) {
      if (get(guestUser, 'email', '') != '') {
        // 게스트 주문 완료 메일 발송
        console.log({ type: 'order', group: 'guest', code: code, lang: guestUser.language });
        const { mail, email_tmpl } = await this.emailService.mailSettings(
          { type: 'order', group: 'guest', code: code, lang: guestUser.language },
          sendInfo
        );
        if (mail != '' && email_tmpl != '') {
          await this.emailService.sendMail(guestUser.email, mail.title, email_tmpl);
        }
      }
      if (get(hostUser, 'email', '') != '') {
        // 호스트 주문 완료 메일 발송
        const { mail, email_tmpl } = await this.emailService.mailSettings(
          { type: 'order', group: 'host', code: code, lang: 'ko' },
          sendInfo
        );
        if (mail != '' && email_tmpl != '') {
          await this.emailService.sendMail(hostUser.email, mail.title, email_tmpl);
        }
      }
      if (get(site, ['site_ko_email', 'set_value'], '') != '') {
        // 호스트 주문 완료 메일 발송
        const { mail, email_tmpl } = await this.emailService.mailSettings(
          { type: 'order', group: 'admin', code: code, lang: 'ko' },
          sendInfo
        );
        if (mail != '' && email_tmpl != '') {
          await this.emailService.sendMail(site.site_ko_email.set_value, mail.title, email_tmpl);
        }
      }
    }
  }

  // 호스트가 이벤트 발생시 메일 발송
  async hostOrderMail(orderMailSendInfo: any, cancelReason: string) {
    const {
      order,
      guestUser,
      hostUser,
      sendInfo,
      site
    } = orderMailSendInfo;
    sendInfo.cancel_reason = cancelReason;

    let code;
    switch (order.status) {
      case 4: // 호스트 승인
        code = 'shipping';
        break;
      case 8: // 주문 취소
        code = 'admin_cancel';
        break;
    }

    if (get(guestUser, 'email', '') != '') {
      // 게스트 주문 완료 메일 발송
      const { mail, email_tmpl } = await this.emailService.mailSettings(
        { type: 'order', group: 'guest', code: code, lang: guestUser.language },
        sendInfo
      );
      if (mail != '' && email_tmpl != '') {
        await this.emailService.sendMail(guestUser.email, mail.title, email_tmpl);
      }
    }
    if (get(hostUser, 'email', '') != '') {
      // 호스트 주문 완료 메일 발송
      const { mail, email_tmpl } = await this.emailService.mailSettings(
        { type: 'order', group: 'host', code: code, lang: 'ko' },
        sendInfo
      );
      if (mail != '' && email_tmpl != '') {
        await this.emailService.sendMail(hostUser.email, mail.title, email_tmpl);
      }
    }
    if (get(site, ['site_ko_email', 'set_value'], '') != '') {
      // 호스트 주문 완료 메일 발송
      const { mail, email_tmpl } = await this.emailService.mailSettings(
        { type: 'order', group: 'admin', code: code, lang: 'ko' },
        sendInfo
      );
      if (mail != '' && email_tmpl != '') {
        await this.emailService.sendMail(site.site_ko_email.set_value, mail.title, email_tmpl);
      }
    }
  }

  // 관리자가 이벤트 발생시 메일 발송
  async adminOrderMail(orderMailSendInfo: any, cancelReason: string) {
    const {
      order,
      guestUser,
      hostUser,
      sendInfo,
      site
    } = orderMailSendInfo;
    sendInfo.cancel_reason = cancelReason;

    let code;
    switch (order.status) {
      case 8: // 주문 취소
        code = 'host_cancel';
        break;
    }

    if (get(guestUser, 'email', '') != '') {
      // 게스트 주문 완료 메일 발송
      const { mail, email_tmpl } = await this.emailService.mailSettings(
        { type: 'order', group: 'guest', code: code, lang: guestUser.language },
        sendInfo
      );
      if (mail != '' && email_tmpl != '') {
        await this.emailService.sendMail(guestUser.email, mail.title, email_tmpl);
      }
    }
    if (get(hostUser, 'email', '') != '') {
      // 호스트 주문 완료 메일 발송
      const { mail, email_tmpl } = await this.emailService.mailSettings(
        { type: 'order', group: 'host', code: code, lang: 'ko' },
        sendInfo
      );
      if (mail != '' && email_tmpl != '') {
        await this.emailService.sendMail(hostUser.email, mail.title, email_tmpl);
      }
    }
    if (get(site, ['site_ko_email', 'set_value'], '') != '') {
      // 호스트 주문 완료 메일 발송
      const { mail, email_tmpl } = await this.emailService.mailSettings(
        { type: 'order', group: 'admin', code: code, lang: 'ko' },
        sendInfo
      );
      if (mail != '' && email_tmpl != '') {
        await this.emailService.sendMail(site.site_ko_email.set_value, mail.title, email_tmpl);
      }
    }
  }

  // 주문 검증
  async orderVerification(orderInfo: OrderEntity) {
    const { response } = await this.iamportService.getPaymentByImpUid(
      orderInfo['imp_uid'],
    );

    console.log('주문 검증 함수 orderVerification: ', { orderInfo });
    const order = await this.findOneCode(orderInfo.code);
    const result = { status: true, message: '' };
    console.log('주문금액(원): ', order.orderProduct[0].payPrice);
    console.log('주문금액(달러): ', order.orderProduct[0].payPriceEng);
    // 결제 금액 계산후 비교
    // 결제 금액과 DB에 저장될 금액이 동일한지 체크
    if (
      response['amount'] != order.orderProduct[0].payPrice
      && response['amount'] != order.orderProduct[0].payPriceEng
    ) {
      result['status'] = false;
      result['message'] = '실 결제 정보와 다름';
    }

    if (!result['status']) {
      await this.cancelProcess(order, result['message']);
      // await this.iamportService.paymentCancel(
      //   orderInfo['imp_uid'],
      //   response['amount'],
      //   result['message'],
      // );
      throw new NotAcceptableException(
        'order.service.orderVerification: ' + result['message'],
      );
    }

    return response;
  }

  // 주문 대시보드
  async dashboard(month: string) {
    const order_cnt = await this.orderRepository
      .createQueryBuilder()
      .select('SUM(IF(`status` = 2, 1, 0))', 'payment_cnt')
      .addSelect('SUM(IF(`status` = 8, 1, 0))', 'cancel_cnt')
      .addSelect('SUM(IF(`status` = 6, 1, 0))', 'confirmed_cnt')
      .where((qb) => {
        qb.where('DATE_FORMAT(`createdAt`, "%Y-%m") = :month', {
          month: month,
        });
      })
      .execute();

    return order_cnt;
  }

  // 게스트 주문 목록 엑셀 생성
  async createExcel(
    userInfo: UsersEntity,
    options: PaginationOptions,
    search: string[],
    order: string,
  ) {
    const { data } = await this.adminFindAll(userInfo, options, search, order);
    if (!data) {
      throw new NotFoundException(
        'order.service.excel: 다운로드할 데이터가 없습니다.',
      );
    }

    return this.excelService.createExcel(data, {
      type: 'order',
    });
  }

  async settingsAlimtalkData(order) {
    return {
      product_title: order.orderProduct.productOption.product.title,    // 숙소이름
      po_title: order.orderProduct.title,   // 방이름
      occupancy_date: order.orderProduct.startAt,   // 입주날짜
      eviction_date: order.orderProduct.endAt,    // 퇴거날짜
      link: '',   // 방문예약 상세 링크
      guest_link: guest_order_url + order.idx,   // 게스트 주문 상세 링크
      host_link: host_order_url + order.idx,   // 호스트 주문 상세 링크
      guest_name: order.user.name, // 신청자명
      phone: order.user.phone, // 연락처
      payment: order.orderProduct.payPrice, // 결제 금액
      po_payment: order.orderProduct.price, // 방 금액
      tax: order.orderProduct.taxPrice, // 부가세
      fee: order.orderProduct.feePrice, // 수수료
      cancel_reason_host: order.orderProduct.cancelReason, // 입주 거절 사유 
      cancel_reason_guest: order.orderProduct.cancelReason, // 입주 거절 사유
    };
  }
}
