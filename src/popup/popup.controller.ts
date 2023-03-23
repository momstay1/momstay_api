import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PopupService } from './popup.service';
import { CreatePopupDto } from './dto/create-popup.dto';
import { UpdatePopupDto } from './dto/update-popup.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import {
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/common.file';
import { PopupFilterDto } from './dto/popup-filter.dto';
@Controller('popup')
@ApiTags('팝업 API')
export class PopupController {
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
  @ApiQuery({
    name: 'take',
    description: '요청 시 가져올 데이터 수',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  async findAll(@Query() filterDto: PopupFilterDto) {
    return await this.popupService.findAll(filterDto);
  }

  @Get(':idx')
  @ApiOperation({ summary: '팝업 상세 조회 API' })
  @ApiParam({ name: 'idx', description: 'popup idx' })
  async findOne(@Param('idx') idx: string) {
    return await this.popupService.findOne(+idx);
  }

  @Patch(':idx')
  @ApiOperation({
    summary: '팝업 수정 API',
    description:
      'status, title, startPeriod, endPeriod, order, link, popupImg 만 변경 가능',
  })
  @ApiParam({ name: 'idx', description: 'popup idx' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
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

  /**
   * [팝업 삭제 구현]
   * TODO Idx 파라미터 체크
   * TODO DB에서 전달받은 Idx 데이터의 status 변경 요청 (논리 삭제)
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.popupService.remove(+id);
  }
}
