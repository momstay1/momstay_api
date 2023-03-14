import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { Repository } from 'typeorm';
import { ReportContentEntity } from './entities/report-content.entity';

@Injectable()
export class ReportContentService {
  constructor(
    @InjectRepository(ReportContentEntity) private reconRepository: Repository<ReportContentEntity>,
  ) { }

  // create(userInfo: UsersEntity, createReportCumulativeDto: CreateReportCumulativeDto) {
  // }

  findAll() {
    return `This action returns all reportCumulative`;
  }

  async findGroup(group: string) {
    if (!group) {
      throw new NotFoundException('reportContent.service.findGroup: 조회할 정보가 없습니다.');
    }
    const reportContent = await this.reconRepository.find({
      where: { group: group }
    });
    if (reportContent.length <= 0) {
      throw new NotFoundException('reportContent.service.findGroup: 조회된 신고 내역이 없습니다.');
    }
    return reportContent;
  }

  async findOne(idx: number) {
    const reportContent = await this.findOneIdx(idx);
    return { reportContent };
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('reportContent.service.findOneIdx: 조회할 정보가 없습니다.');
    }
    const reportContent = await this.reconRepository.findOne({
      where: { idx: idx }
    });
    if (!get(reportContent, 'idx', '')) {
      throw new NotFoundException('reportContent.service.findOneIdx: 조회된 신고 내역이 없습니다.');
    }
    return reportContent;
  }

  // update(id: number, updateReportCumulativeDto: UpdateReportCumulativeDto) {
  //   return `This action updates a #${id} reportCumulative`;
  // }

  remove(id: number) {
    return `This action removes a #${id} reportCumulative`;
  }
}
