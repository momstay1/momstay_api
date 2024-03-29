import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cloneDeep, filter, get, isArray, isEmpty, map, union } from 'lodash';
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
    console.log(files[categoryName]);
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
    bni_content = isArray(bni_content) ? bni_content : [];

    for (const key in bni_content) {
      // content 내용 복사
      const content = cloneDeep(bni_content[key]);

      // file_order 제외
      if (get(content, 'file_order', -1) >= 0) delete content['file_order'];

      // 배너 아이템 데이터 설정
      const bni_data = {
        status: +get(content, 'status', registrationStatus),
        order: +get(content, 'order', key),
        content: JSON.stringify(content),
        start: get(content, 'start', '0'),
        end: get(content, 'end', '0'),
        banner: bannerInfo
      };
      const bni = { update_idx: 0 };
      if (get(content, ['section_idx'], '')) {
        // section idx 존재하는 경우 수정
        bni['update_idx'] = bni_data['idx'] = content['section_idx'];
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
      if (get(bni_content, [key, 'file_order'], -1) >= 0) {
        const file = {};
        file[categoryName] = [];
        // 파일 저장시 배너 아이템 첨부파일 구분하기위해
        // 배너 아이템 content 내에 파일 순서와 첨부된 파일 순서 매칭
        // 수정된 배너 아이템의 첨부된 파일이 없으면 file_order 값이 없으므로 매칭이 안됨
        bni_content[key]['file_order'] = isArray(bni_content[key]['file_order']) ? bni_content[key]['file_order'] : [bni_content[key]['file_order']];
        for (const i in files[categoryName]) {
          if (bni_content[key]['file_order'].includes(+i)) {
            file[categoryName].push(files[categoryName][i]);
          }
        }
        console.log(123);
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
        console.log(234);
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
      try {
        const del_files = await this.fileService.findCategoryForeignAll([categoryName], del_bni_idxs);
        const del_file_idxs = map(del_files, o => '' + o.file_idx);
        await this.fileService.removes(del_file_idxs);
      } catch (error) {
        console.log({ error });
        console.log('삭제할 파일이 없습니다');
      }
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
