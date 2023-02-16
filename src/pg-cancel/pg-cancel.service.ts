import { Injectable } from '@nestjs/common';
import { CreatePgCancelDto } from './dto/create-pg-cancel.dto';
import { UpdatePgCancelDto } from './dto/update-pg-cancel.dto';

@Injectable()
export class PgCancelService {
  create(createPgCancelDto: CreatePgCancelDto) {
    return 'This action adds a new pgCancel';
  }

  findAll() {
    return `This action returns all pgCancel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pgCancel`;
  }

  update(id: number, updatePgCancelDto: UpdatePgCancelDto) {
    return `This action updates a #${id} pgCancel`;
  }

  remove(id: number) {
    return `This action removes a #${id} pgCancel`;
  }
}
