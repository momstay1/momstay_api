import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filter, get, isArray, map } from 'lodash';
import { BannerService } from 'src/banner/banner.service';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
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
    const banner = await this.bannerService.findOneId(createBannerItemDto['bannerId']);
    console.log({ files });
    console.log(files[categoryName]);

    // 배너 아이템 데이터 정리
    let bni_content = JSON.parse(get(createBannerItemDto, 'content'));
    console.log({ bni_content });
    if (!isArray(bni_content)) bni_content = [bni_content];
    for (const key in bni_content) {
      // const bni_data = {
      //   status: +get(createBannerItemDto, 'status', registrationStatus),
      //   order: +key,
      //   content: JSON.stringify(bni_content[key]),
      //   start: get(createBannerItemDto, 'start', '0'),
      //   end: get(createBannerItemDto, 'end', '0'),
      //   banner: banner
      // };
      // if (get(bni_content, [key, 'section_idx'], '')) {
      //   bni_data['idx'] = bni_content[key]['section_idx'];
      // }
      // const bannerItemEntity = await this.bniRepository.create(bni_data);
      // const bannerItem = await this.bniRepository.save(bannerItemEntity);

      // section_idx 설정 후 다시 저장
      // bannerItem['content'] = JSON.parse(bannerItem['content']);
      // bannerItem['content']['section_idx'] = bannerItem['idx'];
      // bannerItem['content'] = JSON.stringify(bannerItem['content']);
      // await this.bniRepository.save(bannerItem);

      if (get(bni_content, [key, 'file_name'], '')) {
        const file = filter(files[categoryName], o => {
          if (!isArray(bni_content[key]['file_name'])) bni_content[key]['file_name'] = [bni_content[key]['file_name']];
          if (bni_content[key]['file_name'].includes(o.originalname)) return o;
        })
        console.log({ file });
        // 새 첨부파일 등록
        // const [fileIdxs] = await this.fileService.createByRequest(files, bannerItem['idx']);
      }
    }


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
}
