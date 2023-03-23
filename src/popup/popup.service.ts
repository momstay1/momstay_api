import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { CreatePopupDto } from './dto/create-popup.dto';
import { UpdatePopupDto } from './dto/update-popup.dto';
import { PopupEntity } from './entities/popup.entity';

const deleteStatus = 1;
@Injectable()
export class PopupService {
  constructor(
    @InjectRepository(PopupEntity)
    private popupRepository: Repository<PopupEntity>,
    private fileService: FileService,
  ) {}
  async create(createPopupDto: CreatePopupDto, files) {
    // 팝업 데이터 가져오기
    const popup_data = {
      status: get(createPopupDto, 'status'),
      title: get(createPopupDto, 'title'),
      startPeriod: get(createPopupDto, 'startPeriod'),
      endPeriod: get(createPopupDto, 'endPeriod'),
      order: get(createPopupDto, 'order', 10),
      link: get(createPopupDto, 'link'),
    };

    // 데이터 DB 저장
    const popupEntity = await this.popupRepository.create(popup_data);
    const popup = await this.popupRepository.save(popupEntity);

    // 새 첨부파일 등록
    const [fileIdxs] = await this.fileService.createByRequest(files, popup.idx);
    let file_info;
    if (get(fileIdxs, ['length'], 0) > 0) {
      file_info = await this.fileService.findIndexs(fileIdxs);
    }

    return { popup, file_info };
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
