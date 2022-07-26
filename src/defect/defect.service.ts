import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';
import { DefectEntity } from './entities/defect.entity';

@Injectable()
export class DefectService {
  constructor(
    @InjectRepository(DefectEntity) private defectRepository: Repository<DefectEntity>,
  ) { }

  create(createDefectDto: CreateDefectDto) {
    return 'This action adds a new defect';
  }

  findAll() {
    return `This action returns all defect`;
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
