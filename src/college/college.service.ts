import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { In, Repository } from 'typeorm';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { CollegeEntity } from './entities/college.entity';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(CollegeEntity) private collegeRepository: Repository<CollegeEntity>,
  ) { }

  create(createCollegeDto: CreateCollegeDto) {
    return 'This action adds a new college';
  }

  async findAll(options: PaginationOptions, search: string[]) {
    const { take, page } = options;
    const where = commonUtils.searchSplit(search);

    const [results, total] = await this.collegeRepository.createQueryBuilder('college')
      .where(qb => {
        if (get(where, 'name', '')) {
          qb.where('('
            + '`college`.nameKor LIKE :name '
            + 'OR `college`.nameEng LIKE :name '
            + 'OR `college`.nameJpn LIKE :name '
            + 'OR `college`.nameChn LIKE :name'
            + ')'
            , { name: '%' + get(where, 'name') + '%' }
          )
        }
      })
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();


    return new Pagination({
      results,
      total,
      page,
    })
  }

  async findAllIdx(idxs: number[]) {
    if (idxs.length <= 0) {
      throw new NotFoundException('college.service.findAllIdx: 잘못된 정보 입니다.');
    }
    const metro = await this.collegeRepository.find({
      where: { idx: In(idxs) }
    });
    if (metro.length <= 0) {
      throw new NotFoundException('college.service.findAllIdx: 조회된 대학교 정보가 없습니다.');
    }

    return metro;
  }

  findOne(id: number) {
    return `This action returns a #${id} college`;
  }

  update(id: number, updateCollegeDto: UpdateCollegeDto) {
    return `This action updates a #${id} college`;
  }

  remove(id: number) {
    return `This action removes a #${id} college`;
  }
}
