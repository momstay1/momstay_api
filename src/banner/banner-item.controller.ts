import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BannerItemService } from './banner-item.service';
import { CreateBannerItemDto } from './dto/create-banner-item.dto';
import { UpdateBannerItemDto } from './dto/update-banner-item.dto';

@Controller('banner-item')
export class BannerItemController {
  constructor(private readonly bannerItemService: BannerItemService) { }

  @Post()
  create(@Body() createBannerItemDto: CreateBannerItemDto) {
    return this.bannerItemService.create(createBannerItemDto);
  }

  @Get()
  findAll() {
    return this.bannerItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerItemDto: UpdateBannerItemDto) {
    return this.bannerItemService.update(+id, updateBannerItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerItemService.remove(+id);
  }
}
