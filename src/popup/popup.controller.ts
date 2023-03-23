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
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import {
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/common.file';
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

  /**
   * [팝업 목록 조회 구현]
   * TODO 페이지 값 및 노출해야할 데이터 수 체크
   * TODO DB에서 팝업 전체 데이터 조회
   * TODO 조회 결과 리턴
   */
  @Get()
  findAll() {
    return this.popupService.findAll();
  }

  @Get(':idx')
  @ApiOperation({ summary: '팝업 상세 조회 API' })
  @ApiParam({ name: 'idx', description: 'popup idx' })
  async findOne(@Param('idx') idx: string) {
    return this.popupService.findOne(+idx);
  }

  /**
   * [팝업 수정 구현]
   * TODO 필수값 체크
   *  - 팝업 데이터 basic{status, title, startAt, endAt, order} detail{link} Img
   *  - 필수값 title, Img
   * TODO DB에 데이터 저장 요청
   * TODO DB에 저장된 팝업 idx, Img idx 리턴
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePopupDto: UpdatePopupDto) {
    return this.popupService.update(+id, updatePopupDto);
  }

  /**
   * [팝업 삭제 구현]
   * TODO Idx 파라미터 체크
   * TODO DB에서 전달받은 Idx 데이터의 status 변경 요청 (논리 삭제)
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.popupService.remove(+id);
  }
}
