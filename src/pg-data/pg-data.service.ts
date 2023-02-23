import { Injectable } from '@nestjs/common';
import { CreatePgDatumDto } from './dto/create-pg-datum.dto';
import { UpdatePgDatumDto } from './dto/update-pg-datum.dto';

@Injectable()
export class PgDataService {
  create(createPgDatumDto: CreatePgDatumDto) {
    return 'This action adds a new pgDatum';
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
