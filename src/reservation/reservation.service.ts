import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, map } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { ProductOptionService } from 'src/product-option/product-option.service';
import { PushNotificationService } from 'src/push-notification/push-notification.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationEntity } from './entities/reservation.entity';

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
    if (po.stayStatus != '1') {
      // 공실이 아닌 경우
      throw new NotAcceptableException('해당 방은 공실 상태가 아닙니다.');
    }
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
        qb.where('`reservation`.status IN (:status)', { status: [1, 2, 4, 5] });
        qb.andWhere('`user`.id = :user_id', { user_id: userInfo.id });
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
        qb.where('`reservation`.status IN (:status)', { status: [1, 2, 4, 5] });
        qb.andWhere('`user`.id = :user_id', { user_id: userInfo.id });
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

  async findOne(idx: number) {
    const reservation = await this.findOneIdx(idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['roomDetailImg'], [reservation.productOption.idx]);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('방 리스트 이미지 파일 없음');
    }
    return { reservation, file_info };
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
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
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }
    return reservation;
  }

  async update(userInfo, idx: number) {
    // 방문 예약 정보 가져오기
    const reservation = await this.findOneIdx(idx);
    await this.processCheckStatus(reservation.status);

    await this.authCheckStatus(userInfo, reservation.productOption.product.user.idx);

    await this.changeStatus(2, idx);
    // 게스트에게 방문예약 거절 push 알림 발송
    const { user } = reservation;
    if (get(user, ['device', 'token'], '')) {
      await this.pushNotiService.hostReservationApprovalPush(user, reservation);
    }
  }

  async guestCancel(userInfo, idx: number) {
    // 방문 예약 정보 가져오기
    const reservation = await this.findOneIdx(idx);
    await this.processCheckStatus(reservation.status);

    await this.authCheckStatus(userInfo, reservation.user.idx);

    await this.changeStatus(4, idx);

    // 호스트에게 방문예약 취소 push 알림 발송
    const { user } = get(reservation, ['productOption', 'product']);
    if (get(user, ['device', 'token'], '')) {
      await this.pushNotiService.guestReservationCancelPush(user, reservation);
    }
  }
  async hostCancel(userInfo, idx: number) {
    // 방문 예약 정보 가져오기
    const reservation = await this.findOneIdx(idx);
    await this.processCheckStatus(reservation.status);

    await this.authCheckStatus(userInfo, reservation.productOption.product.user.idx);

    await this.changeStatus(5, idx);

    // 게스트에게 방문예약 거절 push 알림 발송
    const { user } = reservation;
    if (get(user, ['device', 'token'], '')) {
      await this.pushNotiService.hostReservationCancelPush(user, reservation);
    }
  }

  // 이미 처리된 상태인지 체크
  async processCheckStatus(status) {
    if (status != 1) {
      // 방문예약 대기 상태가 아닌 경우
      throw new NotAcceptableException('이미 처리된 방문예약입니다.');
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
        throw new NotAcceptableException('거부할 수 없는 방문 예약 입니다.');
      }
    }
  }
  // 상태 변경
  async changeStatus(status: number, idx: number) {
    await this.reservationRepository.createQueryBuilder()
      .update(ReservationEntity)
      .set({ status: status })
      .where(" idx IN (:idx)", { idx: idx })
      .execute()
  }
}
