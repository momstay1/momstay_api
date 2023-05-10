import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { CreatePopupDto } from './dto/create-popup.dto';
import { UpdatePopupDto } from './dto/update-popup.dto';
import { PopupEntity } from './entities/popup.entity';

import * as moment from 'moment';

const uncertifiedStatus = 1;
@Injectable()
export class PopupService {
  constructor(
    @InjectRepository(PopupEntity)
    private popupRepository: Repository<PopupEntity>,
    private fileService: FileService,
  ) { }
  async create(createPopupDto: CreatePopupDto, files) {
    // popup id 중복체크
    const popupChk = await this.checkPopupIdExists(createPopupDto.id);
    if (popupChk) {
      throw new UnprocessableEntityException('popup.service.create: 아이디가 중복 됩니다.');
    }

    // 팝업 데이터 가져오기
    const popup_data = {
      status: get(createPopupDto, 'status'),
      id: get(createPopupDto, 'id'),
      title: get(createPopupDto, 'title'),
      page: get(createPopupDto, 'page'),
      startPeriod: get(createPopupDto, 'startPeriod', null),
      endPeriod: get(createPopupDto, 'endPeriod', null),
      order: get(createPopupDto, 'order', 10),
      link: get(createPopupDto, 'link'),
    };
    // id 자동생성
    popup_data['id'] = await this.popupCreateCode();

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

  async findAll(options: PaginationOptions) {
    const { take, page } = options;
    const [results, total] = await this.popupRepository
      .createQueryBuilder('popup')
      .orderBy('createdAt', 'DESC')
      .skip(take * (page - 1) || 0)
      .take(take || 10)
      .getManyAndCount();

    const data = new Pagination({
      results,
      total,
      page,
    });
    return { data };
  }

  async findOne(idx: number) {
    const popup = await this.findOneIdx(idx);

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
      console.log('팝업 상세 이미지 파일 없음');
    }

    return { popup, file_info };
  }

  async getPopup(id: string, page: string) {
    const popup = await this.findByIdOrPage(id, page);
    const popup_idxs = popup.map((e) => e.idx);

    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(
        ['popupImg'],
        popup_idxs,
      );
      file_info = commonUtils.getArrayKey(
        file_info,
        ['file_foreign_idx', 'file_category'],
        true,
      );
    } catch (error) {
      console.log('팝업 상세 이미지 파일 없음');
    }

    return { popup, file_info };
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException(
        'popup.service.findOneIdx: 잘못된 정보 입니다.',
      );
    }
    const popup = await this.popupRepository.findOne({
      where: { idx },
    });
    if (!get(popup, 'idx')) {
      throw new NotFoundException(
        'popup.service.findOneIdx: 정보를 찾을 수 없습니다.',
      );
    }
    return popup;
  }

  async findByIdOrPage(id: string, page: string) {
    if (!id && !page) {
      throw new NotFoundException(
        'popup.service.findByIdOrPage: 잘못된 정보 입니다.',
      );
    }
    const where = {
      status: 2,
    };
    if (id) {
      where['id'] = id;
    }
    if (page) {
      where['page'] = page;
    }

    const popup = await this.popupRepository.find({
      where: where,
      order: { order: 'ASC', createdAt: 'DESC' }
    });

    if (popup.length === 0) {
      throw new NotFoundException(
        'popup.service.findByIdOrPage: 정보를 찾을 수 없습니다.',
      );
    }
    return popup;
  }

  async update(idx: number, updatePopupDto: UpdatePopupDto, files) {
    // 팝업 수정
    const prevPopup = await this.findOneIdx(idx);
    const popupEntity = { ...prevPopup, ...updatePopupDto };
    const popup = await this.popupRepository.save(popupEntity);

    // 유지 안하는 이전파일 제거
    await this.fileService.removeByRequest(updatePopupDto, popup['idx'], [
      'popupImg',
    ]);
    // 새 첨부파일 등록
    await this.fileService.createByRequest(files, popup['idx']);

    // 파일 정보 가져오기
    let file_info;
    try {
      file_info = await this.fileService.findCategory(
        ['popupImg'],
        '' + popup['idx'],
      );
    } catch (error) {
      console.log(error['response']['message']);
    }

    return { popup, file_info };
  }

  async delete(idxs: []) {
    if (idxs.length <= 0) {
      throw new NotFoundException(
        'popup.service.delete: 삭제할 정보가 없습니다.',
      );
    }

    // 팝업 정보 가져오기
    await this.popupRepository
      .createQueryBuilder()
      .delete()
      .where('idx IN (:idxs)', { idxs: idxs })
      .execute();
  }

  async popupCreateCode() {
    const code =
      moment().format('YYMMDD') + commonUtils.createCode().toUpperCase();
    const isCode = await this.checkPopupIdExists(code);

    return isCode ? this.popupCreateCode() : code;
  }

  private async checkPopupIdExists(id: string) {
    return await this.popupRepository.findOne({ id: id });
  }
}
