import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { In, Repository } from 'typeorm';
import { CreateMetroDto } from './dto/create-metro.dto';
import { UpdateMetroDto } from './dto/update-metro.dto';
import { MetroEntity } from './entities/metro.entity';

@Injectable()
export class MetroService {
  constructor(
    @InjectRepository(MetroEntity) private metroRepository: Repository<MetroEntity>,
  ) { }

  create(createMetroDto: CreateMetroDto) {
    return 'This action adds a new metro';
  }

  async findAll(options: PaginationOptions, search: string[]) {
    const { take, page } = options;
    const where = commonUtils.searchSplit(search);

    const [results, total] = await this.metroRepository.createQueryBuilder('metro')
      .where(qb => {
        if (get(where, 'station', '')) {
          qb.where('('
            + '`metro`.stationKor LIKE :name '
            + 'OR `metro`.stationEng LIKE :name '
            + 'OR `metro`.stationJpn LIKE :name '
            + 'OR `metro`.stationChn LIKE :name'
            + ')'
            , { name: '%' + get(where, 'station') + '%' }
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
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const metro = await this.metroRepository.find({
      where: { idx: In(idxs) }
    });
    if (metro.length <= 0) {
      throw new NotFoundException('조회된 지하철 정보가 없습니다.');
    }

    return metro;
  }

  findOne(id: number) {
    return `This action returns a #${id} metro`;
  }

  update(id: number, updateMetroDto: UpdateMetroDto) {
    return `This action updates a #${id} metro`;
  }

  remove(id: number) {
    return `This action removes a #${id} metro`;
  }
}
