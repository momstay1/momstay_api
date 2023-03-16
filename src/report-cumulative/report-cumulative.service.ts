import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReportCumulativeDto } from './dto/create-report-cumulative.dto';
import { UpdateReportCumulativeDto } from './dto/update-report-cumulative.dto';
import { ReportCumulativeEntity } from './entities/report-cumulative.entity';
import { ReportContentService } from './report-content.service';

@Injectable()
export class ReportCumulativeService {
  constructor(
    @InjectRepository(ReportCumulativeEntity) private recuRepository: Repository<ReportCumulativeEntity>,
    private readonly reconService: ReportContentService,
    private readonly userService: UsersService,
  ) { }

  async create(userInfo: UsersEntity, createReportCumulativeDto: CreateReportCumulativeDto) {
    const {
      category,
      foreignIdx,
      reportContentIdx,
    } = createReportCumulativeDto;

    const reportContent = await this.reconService.findOneIdx(reportContentIdx);

    const user = await this.userService.findId(userInfo['id']);

    const rc_data = {
      category,
      foreignIdx,
      reportContent,
      user
    };
    const rcEntity = await this.recuRepository.create(rc_data);
    const reportCumulative = await this.recuRepository.save(rcEntity);

    return { reportCumulative };
  }

  async findAll(options: PaginationOptions, order: string) {
    const { take, page } = options;

    const alias = 'reportCumulative';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');

    const [results, total] = await this.recuRepository.createQueryBuilder('reportCumulative')
      .leftJoinAndSelect('reportCumulative.user', 'user')
      .leftJoinAndSelect('reportCumulative.reportContent', 'reportContent')
      .orderBy(order_by)
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();


    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data };
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('reportCumulative.service.findOneIdx: 조회할 정보가 없습니다.');
    }
    const reportCumulative = await this.recuRepository.findOne({
      where: { idx: idx },
      relations: ['reportContent']
    });
    if (!get(reportCumulative, 'idx', '')) {
      throw new NotFoundException('reportCumulative.service.findOneIdx: 조회된 신고 내역이 없습니다.');
    }
    return reportCumulative;
  }

  update(id: number, updateReportCumulativeDto: UpdateReportCumulativeDto) {
    return `This action updates a #${id} reportCumulative`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportCumulative`;
  }
}
