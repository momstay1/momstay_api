import { Injectable } from '@nestjs/common';
import { CreateMetroDto } from './dto/create-metro.dto';
import { UpdateMetroDto } from './dto/update-metro.dto';

@Injectable()
export class MetroService {
  create(createMetroDto: CreateMetroDto) {
    return 'This action adds a new metro';
  }

  findAll() {
    return `This action returns all metro`;
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
