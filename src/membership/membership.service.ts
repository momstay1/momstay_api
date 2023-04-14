import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isArray } from 'lodash';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { MembershipHistoryEntity } from './entities/membership-history.entity';
import * as moment from 'moment';
import { Pagination, PaginationOptions } from 'src/paginate';
import { commonUtils } from 'src/common/common.utils';
import { ProductService } from 'src/product/product.service';
import { ExcelService } from 'src/excel/excel.service';
import { SettingsService } from 'src/settings/settings.service';
import { Cron } from '@nestjs/schedule';

const applicationStatus = 1;
const approvalStatus = 2;
const endStatus = 3;
@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(MembershipHistoryEntity)
    private membershipHistoryRepository: Repository<MembershipHistoryEntity>,
    private readonly userService: UsersService,
    private readonly productService: ProductService,
    private readonly excelService: ExcelService,
    private readonly settingsService: SettingsService,
  ) { }

  async create(
    userInfo: UsersEntity,
    createMembershipDto: CreateMembershipDto,
  ) {
    // 회원 정보 가져오기
    const user = await this.userService.findId(userInfo['id']);

    const products = await this.productService.findAllUser(user['idx']);
    if (products.length <= 0) {
      throw new NotFoundException('숙소 정보가 없습니다.');
    }

    let status = 0;
    try {
      const membership = await this.findOneLastMembership(user['idx']);
      status = membership['status'];
    } catch (error) {
      console.log({ error });
    }
    if (status == applicationStatus) {
      throw new NotAcceptableException('이미 신청한 멤버십이 존재 합니다.');
    }
    if (status == approvalStatus) {
      throw new NotAcceptableException('멤버십을 사용중입니다.');
    }

    const mh_data = {
      status: +get(createMembershipDto, 'status', 1),
      month: get(createMembershipDto, 'month'),
      depositor: get(createMembershipDto, 'depositor'),
      user: user,
    };

    const membershipHistoryEntity =
      await this.membershipHistoryRepository.create(mh_data);
    const membership = await this.membershipHistoryRepository.save(
      membershipHistoryEntity,
    );

    // TODO: 멤버십 신청 완료 메일 (관리자, 호스트)

    return { membership };
  }

  async findAll(options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    where['status'] = get(where, 'status', [
      applicationStatus,
      approvalStatus,
      endStatus,
    ]);

    const alias = 'membership';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(
      order_by,
      alias + '.createdAt',
      'DESC',
    );

    const [results, total] = await this.membershipHistoryRepository
      .createQueryBuilder('membership')
      .leftJoinAndSelect('membership.user', 'user')
      .where((qb) => {
        qb.where('`membership`.status IN (:status)', {
          status: isArray(get(where, 'status'))
            ? get(where, 'status')
            : [get(where, 'status')],
        });
        // (get(where, 'depositor', '')) && qb.andWhere('`membership`.`depositor` LIKE "%:depositor%"', { depositor: get(where, 'depositor') });
        get(where, 'depositor', '') &&
          qb.andWhere('`membership`.`depositor` LIKE :depositor', {
            depositor: '%' + get(where, 'depositor') + '%',
          });
        get(where, 'name', '') &&
          qb.andWhere('`user`.`name` LIKE :name', {
            name: '%' + get(where, 'name') + '%',
          });
        get(where, 'id', '') &&
          qb.andWhere('`user`.`id` LIKE :id', {
            id: '%' + get(where, 'id') + '%',
          });
        get(where, 'phone', '') &&
          qb.andWhere('`user`.`phone` LIKE :phone', {
            phone: '%' + get(where, 'phone') + '%',
          });
        get(where, 'month', '') &&
          qb.andWhere('`membership`.`month` IN (:month)', {
            month: isArray(get(where, 'month'))
              ? get(where, 'month')
              : [get(where, 'month')],
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

  async findOne(idx: number) {
    const membership = await this.findOneIdx(idx);
    return { membership };
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('멤버십을 조회할 정보가 없습니다.');
    }
    const membership = await this.membershipHistoryRepository.findOne({
      where: { idx: idx },
      relations: ['user'],
    });
    if (!get(membership, 'idx', '')) {
      throw new NotFoundException('조회된 멤버십 정보가 없습니다.');
    }
    return membership;
  }

  async findOneLastMembership(userIdx: number) {
    if (!userIdx) {
      throw new NotFoundException('멤버십을 조회할 정보가 없습니다.');
    }
    const membership = await this.membershipHistoryRepository.findOne({
      where: {
        user: { idx: userIdx },
      },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
    if (!get(membership, 'idx', '')) {
      throw new NotFoundException('조회된 멤버십 정보가 없습니다.');
    }
    return membership;
  }

  async findOneUser(userInfo: UsersEntity) {
    // 회원 정보 가져오기
    const user = await this.userService.findId(userInfo['id']);

    const membership = await this.findOneLastMembership(user['idx']);

    return { membership };
  }

  update(id: number, updateMembershipDto: UpdateMembershipDto) {
    return `This action updates a #${id} membership`;
  }

  async changeStatus(idx: number, status: number) {
    await this.membershipHistoryRepository
      .createQueryBuilder()
      .update()
      .set({ status: status })
      .where(' idx = :idx', { idx: idx })
      .execute();
  }

  // 관리자 멤버십 신청 승인
  async membershipStatusChange(
    idx: number,
    updateMembershipDto: UpdateMembershipDto,
  ) {
    if (!get(updateMembershipDto, ['status'], '')) {
      throw new NotAcceptableException(
        'membership.service.membershipStatusChange: 변경 할 상태값이 없습니다.',
      );
    }

    // 멤버십 정보 가져오기
    const membershipInfo = await this.findOneIdx(idx);
    if (membershipInfo['status'] == updateMembershipDto['status']) {
      throw new NotAcceptableException(
        'membership.service.membershipStatusChange: 이미 처리된 상태 입니다.',
      );
    }

    membershipInfo['status'] = get(updateMembershipDto, 'status');
    membershipInfo['month'] = get(
      updateMembershipDto,
      'month',
      membershipInfo['month'],
    );
    let membershipStatus;
    if (updateMembershipDto['status'] == approvalStatus) {
      // 승인 상태 변경
      const start = moment().format('YYYY-MM-DD');
      const end = moment()
        .add(membershipInfo['month'], 'months')
        .format('YYYY-MM-DD');
      membershipInfo['start'] = start;
      membershipInfo['end'] = end;

      const membership = await this.membershipHistoryRepository.save(
        membershipInfo,
      );

      // 호스트의 모든 숙소 membership 상태 변경
      membershipStatus = '1';
      await this.productService.updateMembership(
        membership['user']['idx'],
        membershipStatus,
      );
    } else {
      // 요청 상태 변경
      membershipInfo['start'] = null;
      membershipInfo['end'] = null;
      membershipStatus = '0';
    }

    // 멤버십 정보 변경
    const membership = await this.membershipHistoryRepository.save(
      membershipInfo,
    );

    // 호스트의 모든 숙소 membership 상태 변경
    await this.productService.updateMembership(
      membership['user']['idx'],
      membershipStatus,
    );

    // TODO: 멤버십 등록 완료(호스트)

    return { membership };
  }

  remove(id: number) {
    return `This action removes a #${id} membership`;
  }

  /******************** cron ********************/
  // 오전 01시 멤버십 기간 체크 및 상태 변경
  @Cron('0 0 1 * * *')
  async checkMembership() {
    console.log(
      '[cron] checkMembership: ',
      moment().format('YYYY-MM-DD HH:mm:ss'),
    );
    const today = moment().format('YYYY-MM-DD');
    const memberships = await this.membershipHistoryRepository
      .createQueryBuilder('membership')
      .leftJoinAndSelect('membership.user', 'user')
      .where((qb) => {
        qb.where('`membership`.status = :status', { status: approvalStatus });
        qb.andWhere('`membership`.end < :end', { end: today });
      })
      .getMany();
    console.log('멤버십 종료된 개수: ', memberships.length);
    if (memberships.length > 0) {
      const membershipStatus = '0';
      for (const key in memberships) {
        // 멤버십 종료 상태 변경
        await this.changeStatus(memberships[key]['idx'], endStatus);

        // 숙소 멤버십 미사용 상태 변경
        await this.productService.updateMembership(
          memberships[key]['user']['idx'],
          membershipStatus,
        );
      }
    }
  }

  // 멤버십 신청 목록 엑셀 생성
  async createExcel(
    options: PaginationOptions,
    search: string[],
    order: string,
  ) {
    const { data } = await this.findAll(options, search, order);
    if (!data) {
      throw new NotFoundException(
        'membership.service.excel: 다운로드할 데이터가 없습니다.',
      );
    }
    // settings 테이블에서 멤버십 기간별 금액 가져오기
    const membership_price = await this.settingsService.find(
      'membership_price',
    );

    return this.excelService.createExcel(data, {
      type: 'membership',
      settingsData: membership_price,
    });
  }
}
