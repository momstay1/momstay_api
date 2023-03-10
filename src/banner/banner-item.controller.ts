import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { multerOptions } from 'src/common/common.file';
import { Auth } from 'src/common/decorator/role.decorator';
import { BannerItemService } from './banner-item.service';
import { CreateBannerItemDto } from './dto/create-banner-item.dto';
import { UpdateBannerItemDto } from './dto/update-banner-item.dto';

@Controller('banner-item')
export class BannerItemController {
  constructor(private readonly bannerItemService: BannerItemService) { }

  @Post()
  @ApiOperation({ summary: '배너 아이템 등록 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'bniImg', maxCount: 10 },
  ], multerOptions()))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createBannerItemDto: CreateBannerItemDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return await this.bannerItemService.create(createBannerItemDto, files);
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
