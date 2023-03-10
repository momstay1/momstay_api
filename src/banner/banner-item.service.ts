import { Injectable } from '@nestjs/common';
import { CreateBannerItemDto } from './dto/create-banner-item.dto';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerItemDto } from './dto/update-banner-item.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannerItemService {
  create(createBannerItemDto: CreateBannerItemDto) {
    return 'This action adds a new banner';
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
