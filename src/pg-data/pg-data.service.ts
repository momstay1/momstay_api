import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePgDatumDto } from './dto/create-pg-data.dto';
import { UpdatePgDatumDto } from './dto/update-pg-data.dto';
import { PgDataEntity } from './entities/pg-data.entity';

@Injectable()
export class PgDataService {
  constructor(
    @InjectRepository(PgDataEntity) private pgDataRepository: Repository<PgDataEntity>,
  ) { }

  async create(ord_code: string, createPgData) {
    createPgData['pg_data'] = JSON.stringify(createPgData);
    createPgData['productCode'] = ord_code;

    const pg_data = await this.pgDataRepository.create(createPgData);
    const pg = await this.pgDataRepository.save(pg_data);

    return pg;
  }

  findAll() {
    return `This action returns all pgData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pgDatum`;
  }

  update(id: number, updatePgDatumDto: UpdatePgDatumDto) {
    return `This action updates a #${id} pgDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} pgDatum`;
  }
}
