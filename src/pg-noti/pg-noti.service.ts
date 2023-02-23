import { Injectable } from '@nestjs/common';
import { CreatePgNotiDto } from './dto/create-pg-noti.dto';
import { UpdatePgNotiDto } from './dto/update-pg-noti.dto';

@Injectable()
export class PgNotiService {
  create(createPgNotiDto: CreatePgNotiDto) {
    return 'This action adds a new pgNoti';
  }

  findAll() {
    return `This action returns all pgNoti`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pgNoti`;
  }

  update(id: number, updatePgNotiDto: UpdatePgNotiDto) {
    return `This action updates a #${id} pgNoti`;
  }

  remove(id: number) {
    return `This action removes a #${id} pgNoti`;
  }
}
