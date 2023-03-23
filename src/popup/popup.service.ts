import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { Pagination } from 'src/paginate';
import { Repository } from 'typeorm';
import { CreatePopupDto } from './dto/create-popup.dto';
import { PopupFilterDto } from './dto/popup-filter.dto';
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

  async findAll(filterDto: PopupFilterDto) {
    const { take, page } = filterDto;
    const [results, total] = await this.popupRepository
      .createQueryBuilder('popup')
      .orderBy('createdAt', 'DESC')
      .skip(take * (page - 1) || 0)
      .take(take)
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
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const popup = await this.popupRepository.findOne({
      where: { idx },
    });
    if (!get(popup, 'idx')) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }
    return popup;
  }

  async findOne(idx: number) {
    const popup = await this.findOneIdx(idx);
    if (popup.status === deleteStatus) {
      throw new NotFoundException('삭제된 후기 입니다.');
    }
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(
        ['popupImg'],
        [popup.idx],
      );
      file_info = commonUtils.getArrayKey(
        file_info,
        ['file_foreign_idx', 'file_category'],
        true,
      );
    } catch (error) {
      console.log('후기 상세 이미지 파일 없음');
    }
    return { popup, file_info };
  }

  update(id: number, updatePopupDto: UpdatePopupDto) {
    return `This action updates a #${id} popup`;
  }

  remove(id: number) {
    return `This action removes a #${id} popup`;
  }
}
