import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isArray, map } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { ProductOptionService } from 'src/product-option/product-option.service';
import { PushNotificationService } from 'src/push-notification/push-notification.service';
import { UsersService } from 'src/users/users.service';
import { In, Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationEntity } from './entities/reservation.entity';

const readyStatus = 1;
const approvalStatus = 2;
const confirmationStatus = 3;
const cancelStatus = 4;
const refusalStatus = 5;
const status = [
  readyStatus,
  approvalStatus,
  confirmationStatus,
  cancelStatus,
  refusalStatus
];
@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity) private reservationRepository: Repository<ReservationEntity>,
    private readonly productOptionService: ProductOptionService,
    private readonly usersService: UsersService,
    private readonly fileService: FileService,
    private readonly pushNotiService: PushNotificationService,
  ) { }

  async create(userInfo, createReservationDto: CreateReservationDto) {
    // 방 정보 가져오기
    const po = await this.productOptionService.findIdx(createReservationDto.productOptionIdx);
    if (po.status != 2) {
      // 사용중이 아닌경우
      throw new NotAcceptableException('게시하지 않은 방입니다.');
    }
    // if (po.stayStatus != '1') {
    //   // 공실이 아닌 경우
    //   throw new NotAcceptableException('해당 방은 공실 상태가 아닙니다.');
    // }
    if (po.visitStatus != '2') {
      // 방문예약 상태 미사용인경우
      throw new NotAcceptableException('방문예약을 사용하지 않는 방입니다.');
    }

    // 회원 정보 가져오기
    const user = await this.usersService.findId(userInfo.id);

    if (user['group']['id'] == 'host' && user['idx'] == get(po, ['product', 'user', 'idx'], '')) {
      // 호스트 계정이 자신의 방 예약하는 경우
      throw new NotAcceptableException('자신의 방은 예약할 수 없습니다.');
    }

    const reservation_data = {
      visitDate: createReservationDto.visitDate,
      visitTime: createReservationDto.visitTime,
      occupancyAt: createReservationDto.occupancyAt,
      evictionAt: createReservationDto.evictionAt,
      memo: createReservationDto.memo,
      productOption: po,
      user: user
    };
    const reservationEntity = await this.reservationRepository.create(reservation_data);
    const reservation = await this.reservationRepository.save(reservationEntity);

    // 호스트에게 방문예약 push 알림 발송
    const hostUser = get(po, ['product', 'user']);
    console.log(hostUser.device);
    if (get(hostUser, ['device', 'token'], '')) {
      await this.pushNotiService.guestReservationPush(hostUser, po);
    }
    return { reservation };
  }

  async hostFindAll(options: PaginationOptions, userInfo) {
    const { take, page } = options;
    const [results, total] = await this.reservationRepository.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('product.user', 'user')
      .where((qb) => {
        qb.where('`reservation`.status IN (:status)', { status: status });
        if (userInfo['group'] == 'host') {
          qb.andWhere('`user`.id = :user_id', { user_id: userInfo['id'] });
        }
      })
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const product_option_idxs = map(results, o => o.productOption.idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['roomDetailImg'], product_option_idxs);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('방 리스트 이미지 파일 없음');
    }
    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data, file_info }
  }
  async guestFindAll(options: PaginationOptions, userInfo) {
    const { take, page } = options;
    const [results, total] = await this.reservationRepository.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('reservation.user', 'user')
      .where((qb) => {
        qb.where('`reservation`.status IN (:status)', { status: status });
        if (['host', 'guest'].includes(userInfo['group'])) {
          qb.andWhere('`user`.id = :user_id', { user_id: userInfo['id'] });
        }
      })
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const product_option_idxs = map(results, o => o.productOption.idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['roomDetailImg'], product_option_idxs);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('방 리스트 이미지 파일 없음');
    }
    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data, file_info }
  }

  async findAll(userInfo, options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    where['status'] = get(where, 'status', status);

    const alias = 'reservation';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');

    const [results, total] = await this.reservationRepository.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.user', 'guestUser')
      .leftJoinAndSelect('reservation.productOption', 'productOption')
      .leftJoinAndSelect('productOption.product', 'product')
      .leftJoinAndSelect('product.user', 'hostUser')
      .where((qb) => {
        qb.where('`reservation`.status IN (:status)', { status: isArray(where['status']) ? where['status'] : [where['status']] });
        get(where, 'po_title', '') && qb.andWhere('`productOption`.title LIKE :po_title', { po_title: '%' + where['po_title'] + '%' })
        get(where, 'name', '') && qb.andWhere('`guestUser`.name LIKE :name', { name: '%' + where['name'] + '%' })
        get(where, 'email', '') && qb.andWhere('`guestUser`.email LIKE :email', { email: '%' + where['email'] + '%' })
        get(where, 'min_visit_date', '') && qb.andWhere('`reservation`.visitDate >= :min_visit_date', { min_visit_date: where['min_visit_date'] })
        get(where, 'max_visit_date', '') && qb.andWhere('`reservation`.visitDate <= :max_visit_date', { max_visit_date: where['max_visit_date'] })
      })
      .orderBy(order_by)
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const product_option_idxs = map(results, o => o.productOption.idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['roomDetailImg'], product_option_idxs);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('방 리스트 이미지 파일 없음');
    }
    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data, file_info }
  }

  async findOne(idx: number) {
    const reservation = await this.findOneIdx(idx);
    let file_info = {};
    let po_file = [];
    let product_file = [];
    try {
      po_file = await this.fileService.findCategoryForeignAll(['roomDetailImg'], [reservation.productOption.idx]);
    } catch (error) {
      console.log('방 리스트 이미지 파일 없음');
    }
    try {
      product_file = await this.fileService.findCategoryForeignAll(['lodgingDetailImg', 'mealsImg'], [reservation.productOption.product.idx]);
    } catch (error) {
      console.log('숙소 리스트 이미지 파일 없음');
    }
    file_info = commonUtils.getArrayKey([...po_file, ...product_file], ['file_foreign_idx', 'file_category'], true);
    return { reservation, file_info };
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('reservation.service.findOneIdx: 잘못된 정보 입니다.');
    }
    const reservation = await this.reservationRepository.findOne({
      where: { idx: idx },
      relations: [
        'productOption',
        'productOption.product',
        'productOption.product.user',
        'productOption.product.user.device',
        'user',
        'user.device'
      ]
    });
    if (!reservation.idx) {
      throw new NotFoundException('reservation.service.findOneIdx: 정보를 찾을 수 없습니다.');
    }
    return reservation;
  }

  async findIdxs(idxs: number[]): Promise<Array<ReservationEntity>> {
    if (idxs.length <= 0) {
      throw new NotFoundException('reservation.service.findIdxs: 잘못된 정보 입니다.');
    }
    const reservation = await this.reservationRepository.find({
      where: { idx: In(idxs) },
      relations: [
        'productOption',
        'productOption.product',
        'productOption.product.user',
        'productOption.product.user.device',
        'user',
        'user.device'
      ]
    });
    if (reservation.length <= 0) {
      throw new NotFoundException('reservation.service.findIdxs: 정보를 찾을 수 없습니다.');
    }
    return reservation;
  }

  // 방문 예약 확정(게스트)
  async guestConfirmation(userInfo, idx: number) {
    // 방문 예약 정보 가져오기
    const reservation = await this.findOneIdx(idx);
    if (reservation.status != approvalStatus) {
      // 방문예약 승인 상태가 아닌 경우
      throw new NotAcceptableException('reservation.service.guestConfirmation: 처리할 수 없습니다.');
    }

    await this.authCheckStatus(userInfo, reservation.productOption.product.user.idx);

    await this.changeStatus(confirmationStatus, idx);
    // 호스트에게 방문예약 확정 push 알림 발송
    const { user } = get(reservation, ['productOption', 'product']);
    if (get(user, ['device', 'token'], '')) {
      await this.pushNotiService.guestReservationConfirmationPush(user, reservation);
    }
    // TODO: 알림톡 기능 (호스트에게 확정 알림톡, 게스트 자신에게 후기 작성 알림톡)
  }

  // 방문 예약 승인(호스트)
  async hostApproval(userInfo, idx: number) {
    // 방문 예약 정보 가져오기
    const reservation = await this.findOneIdx(idx);
    await this.processCheckStatus(reservation.status);

    await this.authCheckStatus(userInfo, reservation.productOption.product.user.idx);

    await this.changeStatus(approvalStatus, idx);
    // 게스트에게 방문예약 거절 push 알림 발송
    const { user } = reservation;
    if (get(user, ['device', 'token'], '')) {
      await this.pushNotiService.hostReservationApprovalPush(user, reservation);
    }

    // TODO: 알림톡 기능 (게스트에게 승인 알림톡)
  }

  // 방문 예약 승인(호스트)
  async update(userInfo, idx: number) {
    // 방문 예약 정보 가져오기
    const reservation = await this.findOneIdx(idx);
    await this.processCheckStatus(reservation.status);

    await this.authCheckStatus(userInfo, reservation.productOption.product.user.idx);

    await this.changeStatus(approvalStatus, idx);
    // 게스트에게 방문예약 거절 push 알림 발송
    const { user } = reservation;
    if (get(user, ['device', 'token'], '')) {
      await this.pushNotiService.hostReservationApprovalPush(user, reservation);
    }

    // TODO: 알림톡 기능 (겟트에게 거정 알림톡)
  }

  // 방문 예약 취소(게스트)
  async guestCancel(userInfo, idx: number) {
    // 방문 예약 정보 가져오기
    const reservation = await this.findOneIdx(idx);
    await this.processCheckStatus(reservation.status);

    await this.authCheckStatus(userInfo, reservation.user.idx);

    await this.changeStatus(cancelStatus, idx);

    // 호스트에게 방문예약 취소 push 알림 발송
    const { user } = get(reservation, ['productOption', 'product']);
    if (get(user, ['device', 'token'], '')) {
      await this.pushNotiService.guestReservationCancelPush(user, reservation);
    }

    // TODO: 알림톡 기능 (호스트에게 취소 알림톡)
  }

  // 방문 예약 거절(호스트)
  async hostCancel(userInfo, idx: number) {
    // 방문 예약 정보 가져오기
    const reservation = await this.findOneIdx(idx);
    await this.processCheckStatus(reservation.status);

    await this.authCheckStatus(userInfo, reservation.productOption.product.user.idx);

    await this.changeStatus(refusalStatus, idx);

    // 게스트에게 방문예약 거절 push 알림 발송
    const { user } = reservation;
    if (get(user, ['device', 'token'], '')) {
      await this.pushNotiService.hostReservationCancelPush(user, reservation);
    }

    // TODO: 알림톡 기능 (게스트에게 거절 알림톡)
  }

  // 이미 처리된 상태인지 체크
  async processCheckStatus(status) {
    if (status != readyStatus) {
      // 방문예약 대기 상태가 아닌 경우
      throw new NotAcceptableException('reservation.service.processCheckStatus: 이미 처리된 방문예약입니다.');
    }
  }
  // 상태 변경 가능한지 권한 체크
  async authCheckStatus({ group, id }, idx) {
    if (!commonUtils.isAdmin(group)) {
      // 관리자가 아닌 경우
      // 회원 정보 가져오기
      const user = await this.usersService.findId(id);
      if (user.idx != idx) {
        // 방 호스트가 아닌 경우
        throw new NotAcceptableException('reservation.service.authCheckStatus: 거부할 수 없는 방문 예약 입니다.');
      }
    }
  }
  // 상태 변경
  async changeStatus(status: number, idx: number | number[]) {
    await this.reservationRepository.createQueryBuilder()
      .update(ReservationEntity)
      .set({ status: status })
      .where(" idx IN (:idx)", { idx: idx })
      .execute()
  }

  // 방문 예약 상태 변경(관리자)
  async adminChangeStatus(status: number, idxs: number[]) {
    const reservations = await this.findIdxs(idxs);
    await this.changeStatus(status, idxs);

    for (const key in reservations) {
      const guestUser = reservations[key].user;
      const hostUser = reservations[key].productOption.product.user;
      await this.pushNotiService.adminReservationStatusChange(guestUser, hostUser, reservations[key]);
    }
  }

  // 방문 예약 대시보드
  async dashboard(month: string) {
    const reservation_cnt = await this.reservationRepository.createQueryBuilder()
      .select('COUNT(`idx`)', 'total_cnt')
      .where(qb => {
        qb.where('DATE_FORMAT(`createdAt`, "%Y-%m") = :month', { month: month })
      })
      .execute();

    return reservation_cnt;
  }
}
