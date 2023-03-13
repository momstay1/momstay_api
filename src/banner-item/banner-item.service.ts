import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filter, get, isArray, isEmpty, map, union } from 'lodash';
import { BannerService } from 'src/banner/banner.service';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { In, Repository } from 'typeorm';
import { CreateBannerItemDto } from './dto/create-banner-item.dto';
import { UpdateBannerItemDto } from './dto/update-banner-item.dto';
import { BannerItemEntity } from './entities/banner-item.entity';

const registrationStatus = 2;
const categoryName = 'bniImg';
@Injectable()
export class BannerItemService {
  constructor(
    @InjectRepository(BannerItemEntity) private bniRepository: Repository<BannerItemEntity>,
    @Inject(forwardRef(() => BannerService)) private readonly bannerService: BannerService,
    private readonly fileService: FileService,
  ) { }

  async create(createBannerItemDto: CreateBannerItemDto, files) {
    // 배너 정보 가져오기
    const { bannerId } = createBannerItemDto;
    const bannerInfo = await this.bannerService.findOneId(bannerId);

    let del_bni;
    if (bannerInfo['bannerItem']) {
      // 기존 배너 아이템 idx별로 정리
      del_bni = commonUtils.getArrayKey(bannerInfo['bannerItem'], ['idx'], true);
    }

    // 배너 아이템 데이터 정리
    let bni_content = JSON.parse(get(createBannerItemDto, 'content'));
    if (!isArray(bni_content)) bni_content = [bni_content];
    for (const key in bni_content) {
      // 배너 아이템 데이터 설정
      const bni_data = {
        status: +get(bni_content[key], 'status', registrationStatus),
        order: +get(bni_content[key], 'order', key),
        content: JSON.stringify(bni_content[key]),
        start: get(bni_content[key], 'start', '0'),
        end: get(bni_content[key], 'end', '0'),
        banner: bannerInfo
      };
      const bni = { update_idx: 0 };
      if (get(bni_content, [key, 'section_idx'], '')) {
        // section idx 존재하는 경우 수정
        bni['update_idx'] = bni_data['idx'] = bni_content[key]['section_idx'];
      }
      const bannerItemEntity = await this.bniRepository.create(bni_data);
      const bannerItem = await this.bniRepository.save(bannerItemEntity);

      // 수정된 배너아이템은 del_bni에서 제거
      if (get(del_bni, [bannerItem['idx']], '')) delete del_bni[bannerItem['idx']];

      bannerItem['content'] = JSON.parse(bannerItem['content']);
      if (!get(bannerItem, ['content', 'section_idx'], '')) {
        // section_idx 없는 경우 설정 후 다시 저장
        bannerItem['content']['section_idx'] = bannerItem['idx'];
        bannerItem['content'] = JSON.stringify(bannerItem['content']);
        await this.bniRepository.save(bannerItem);
      }

      // 배너 아이템 첨부파일 설정
      if (get(bni_content, [key, 'file_name'], '')) {
        const file = {};
        // 파일 저장시 배너 아이템 첨부파일 구분하기위해
        // 배너 아이템 content 내에 파일 이름과 첨부된 파일 이름 매칭
        // 수정된 배너 아이템의 경우 첨부된 파일이 없으면 매칭이 안됨
        file[categoryName] = filter(files[categoryName], o => {
          if (!isArray(bni_content[key]['file_name'])) bni_content[key]['file_name'] = [bni_content[key]['file_name']];
          if (bni_content[key]['file_name'].includes(o.originalname)) return o;
        })
        if (bni['update_idx'] > 0 && file[categoryName].length > 0) {
          try {
            // 배너 아이템 첨부파일 수정하는 경우 기존 첨부파일 삭제
            const files = await this.fileService.findCategory([categoryName], '' + bni['update_idx']);
            const delFileIdxs = map(files, o => '' + o.file_idx);
            if (delFileIdxs.length > 0) {
              await this.fileService.removes(delFileIdxs);
            }
          } catch (error) {
            console.log('삭제할 파일정보가 없습니다.');
          }
        }
        if (file[categoryName].length > 0) {
          // 배너 아이템 별 첨부파일 등록
          await this.fileService.createByRequest(file, bannerItem['idx']);
        }
      }
    }

    if (!isEmpty(del_bni)) {
      // 삭제된 배너 아이템 제거 기능 작업 필요
      let del_bni_idxs = [];
      for (const key in del_bni) {
        const idxs = map(del_bni[key], o => o.idx);
        del_bni_idxs = union(del_bni_idxs, idxs);
      }
      // 배너 아이템 첨부파일 제거
      const del_files = await this.fileService.findCategoryForeignAll([categoryName], del_bni_idxs);
      const del_file_idxs = map(del_files, o => '' + o.file_idx);
      await this.fileService.removes(del_file_idxs);
      // 배너 아이템 제거
      await this.removeIdxs(del_bni_idxs);
    }

    const banner = await this.bannerService.findOneId(bannerId);
    const fileIdxs = map(banner['bannerItem'], o => o.idx)
    let file_info = {};
    if (fileIdxs.length > 0) {
      // 파일 정보 가져오기
      try {
        file_info = await this.fileService.findCategoryForeignAll([categoryName], fileIdxs);
        file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
      } catch (error) {
        console.log('파일정보가 없습니다.');
      }
    }

    return { banner, file_info };
  }

  findAll() {
    return `This action returns all banner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} banner`;
  }

  update(id: number, updateBannerItemDto: UpdateBannerItemDto) {
    return `This action updates a #${id} banner`;
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }

  async removeIdxs(idxs: number[]) {
    await this.bniRepository.createQueryBuilder()
      .delete()
      .where({ idx: In(idxs) })
      .execute();
  }
}
