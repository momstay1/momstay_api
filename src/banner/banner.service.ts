import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { Repository } from 'typeorm';
import { BannerItemService } from './banner-item.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BannerEntity } from './entities/banner.entity';
import * as moment from 'moment';
import { FileService } from 'src/file/file.service';
import { commonUtils } from 'src/common/common.utils';

const registrationStatus = 2;

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity) private bannerRepository: Repository<BannerEntity>,
    private readonly biService: BannerItemService,
    private readonly fileService: FileService,
  ) { }

  create(createBannerDto: CreateBannerDto) {
    return 'This action adds a new banner';
  }

  findAll() {
    return `This action returns all banner`;
  }

  async findOne(id: string) {
    const banner = await this.findOneId(id);

    banner['itemInfo'] = JSON.parse(banner['itemInfo']);

    let bni_idxs = [];
    if (banner['bannerItem'].length > 0) {
      const today = moment().format('YYYY-MM-DD HH:ss:mm')
      for (const key in banner['bannerItem']) {
        if (
          banner['bannerItem'][key]['status'] != registrationStatus
          || banner['bannerItem'][key]['start'] > today
          || banner['bannerItem'][key]['end'] < today
        ) {
          delete banner['bannerItem'][key];
        } else {
          bni_idxs.push(banner['bannerItem'][key]['idx']);
        }
      }
    }

    // 파일 정보 가져오기
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['bniImg'], bni_idxs);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('배너 아이템 이미지 파일 없음');
    }

    return { banner, file_info };
  }

  async findOneId(id: string) {
    if (!id) {
      throw new NotFoundException('배너 아이디 정보가 없습니다.');
    }
    const banner = await this.bannerRepository.findOne({
      where: { id: id, status: registrationStatus },
      relations: ['bannerItem']
    });
    if (!get(banner, 'idx', '')) {
      throw new NotFoundException('조회된 배너가 없습니다.');
    }
    return banner;
  }

  update(id: number, updateBannerDto: UpdateBannerDto) {
    return `This action updates a #${id} banner`;
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
