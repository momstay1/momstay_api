import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isArray, map } from 'lodash';
import { AlignmentOptions } from 'src/alignment';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersService } from 'src/users/users.service';
import { In, Repository } from 'typeorm';
import { dftConstant } from './constants';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';
import { DefectEntity } from './entities/defect.entity';

@Injectable()
export class DefectService {
  constructor(
    @InjectRepository(DefectEntity) private defectRepository: Repository<DefectEntity>,
    private readonly usersService: UsersService,
  ) { }

  getPrivateColumn(): string[] {
    const userPrivateColumn = this.usersService.getPrivateColumn();
    return [
      ...dftConstant.privateColumn,
      ...userPrivateColumn
    ];
  }

  create(createDefectDto: CreateDefectDto) {
    return 'This action adds a new defect';
  }

  async findAll(
    place: number,
    options: PaginationOptions,
    alignment: AlignmentOptions,
    search: string[]
  ) {
    // 페이지 네이션
    const { take, page } = options;

    // 정렬 설정
    const order = {};
    if (alignment['order'] && alignment['sort']) {
      order[dftConstant.prefix + '_' + alignment['order']] = alignment['sort'].toUpperCase();
    }
    order['dft_createdAt'] = 'DESC';

    // 조건 설정
    const where = {};
    console.log(search);
    if (search) {
      search = isArray(search) ? search : [search];
      map(search, (obj) => {
        if (obj) {
          const key_val = obj.split(':');
          where[key_val[0]] = key_val[1];
        }
      });
    }

    const [results, total] = await this.defectRepository.findAndCount({
      order: order,
      where: (qb) => {
        qb.where('dft_place_idx = :dft_place_idx', { dft_place_idx: place });
        get(where, 'sort1', '') && qb.andWhere('dft_sort1 = :dft_sort1', { dft_sort1: get(where, 'sort1') });
        get(where, 'sort2', '') && qb.andWhere('dft_sort2 = :dft_sort2', { dft_sort2: get(where, 'sort2') });
        get(where, 'sort3', '') && qb.andWhere('dft_sort3 = :dft_sort3', { dft_sort3: get(where, 'sort3') });
        get(where, 'status', '') && qb.andWhere('dft_status = :dft_status', { dft_status: get(where, 'status') });
        get(where, 'type', '') && qb.andWhere('dft_type = :dft_type', { dft_type: get(where, 'type') });
        get(where, 'shooting_day_lte', '') && qb.andWhere('dft_shooting_day <= :dft_shooting_day_lte', { dft_shooting_day_lte: get(where, 'shooting_day_lte') });
        get(where, 'shooting_day_mte', '') && qb.andWhere('dft_shooting_day >= :dft_shooting_day_mte', { dft_shooting_day_mte: get(where, 'shooting_day_mte') });
        get(where, 'name', '') && qb.andWhere('user_name = :user_name', { user_name: get(where, 'name') });
      },
      relations: ['user'],
      take: take,
      skip: take * (page - 1)
    });
    return new Pagination({
      results,
      total,
    })
  }

  async findAllPlace(place_idx: Array<Number>) {
    const defect = await this.defectRepository.createQueryBuilder()
      .select('COUNT(dft_place_idx)', 'defect_cnt')
      .addSelect('dft_place_idx')
      .where('dft_place_idx IN (:place_idx)', { place_idx: place_idx })
      .orderBy('dft_createdAt', 'DESC')
      .groupBy('dft_place_idx')
      .getRawMany()

    return defect;
  }

  findOne(id: number) {
    return `This action returns a #${id} defect`;
  }

  update(id: number, updateDefectDto: UpdateDefectDto) {
    return `This action updates a #${id} defect`;
  }

  remove(id: number) {
    return `This action removes a #${id} defect`;
  }
}
