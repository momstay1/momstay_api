import { Injectable } from '@nestjs/common';
import { CreatePopupDto } from './dto/create-popup.dto';
import { UpdatePopupDto } from './dto/update-popup.dto';

@Injectable()
export class PopupService {
  create(createPopupDto: CreatePopupDto) {
    return 'This action adds a new popup';
  }

  findAll() {
    return `This action returns all popup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} popup`;
  }

  update(id: number, updatePopupDto: UpdatePopupDto) {
    return `This action updates a #${id} popup`;
  }

  remove(id: number) {
    return `This action removes a #${id} popup`;
  }
}
