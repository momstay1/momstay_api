import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  UploadedFiles,
  UseInterceptors,
  Query,
  HttpCode,
} from '@nestjs/common/decorators';
import { PopupService } from './popup.service';
import { CreatePopupDto } from './dto/create-popup.dto';
import { UpdatePopupDto } from './dto/update-popup.dto';
import { Auth } from 'src/common/decorator/role.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/common.file';
import { PopupEntity } from './entities/popup.entity';

@Controller('admin/popup')
@ApiTags('팝업(관리자) API')
export class AdminPopupController {
  constructor(private readonly popupService: PopupService) {}

  @Post()
  @ApiOperation({ summary: '팝업 생성 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'popupImg', maxCount: 1 }], multerOptions()),
  )
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createPopupDto: CreatePopupDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.popupService.create(createPopupDto, files);
  }

  @Get()
  @ApiOperation({ summary: '팝업 리스트 조회 API' })
  async findAll(@Query('page') page: number, @Query('take') take: number) {
    const { data } = await this.popupService.findAll({ take, page });
    return { ...data };
  }

  @Get(':idx')
  @ApiOperation({ summary: '팝업 상세 조회 API' })
  @ApiCreatedResponse({ type: PopupEntity })
  @ApiParam({ name: 'idx', description: 'popup idx' })
  async findOne(@Param('idx') idx: number) {
    return await this.popupService.findOne(idx);
  }

  @Patch(':idx')
  @ApiOperation({
    summary: '팝업 수정 API',
    description:
      'status, title, startPeriod, endPeriod, order, link, popupImg 만 변경 가능',
  })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiParam({ name: 'idx', description: 'popup idx' })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'popupImg', maxCount: 1 }], multerOptions()),
  )
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('idx') idx: number,
    @Body() updatePopupDto: UpdatePopupDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.popupService.update(+idx, updatePopupDto, files);
  }

  @Delete()
  @ApiOperation({ summary: '팝업 삭제 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiBody({
    description: 'popup idx를 배열로 전달 ex) [1,2,3]',
    schema: {
      properties: {
        idxs: {
          example: [],
        },
      },
    },
  })
  @HttpCode(204)
  async delete(@Body('idxs') idxs: []): Promise<void> {
    await this.popupService.delete(idxs);
  }
}
