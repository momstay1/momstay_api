import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, UseInterceptors, UploadedFile, Header, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { map } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { Auth } from 'src/common/decorator/role.decorator';
import { DefectPlaceService } from './defect-place.service';
import { CreateDefectPlaceDto } from './dto/create-defect-place.dto';
import { UpdateDefectPlaceDto } from './dto/update-defect-place.dto';

@Controller('defect-place')
@ApiTags('하자현장 API')
export class DefectPlaceController {
  constructor(private readonly defectPlaceService: DefectPlaceService) { }

  sanitizeDefectPlace(data) {
    return commonUtils.sanitizeEntity(data, this.defectPlaceService.getPrivateColumn());
  };

  @Post()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_하자현장등록 API' })
  @ApiBody({ type: CreateDefectPlaceDto })
  async create(@Body() createDefectPlaceDto: CreateDefectPlaceDto) {
    const dfp = this.defectPlaceService.create(createDefectPlaceDto);
    return this.sanitizeDefectPlace(dfp);
  }

  @Get()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_하자현장 리스트 API' })
  async findAll(@Query('place') place: number, @Query('take') take: number, @Query('page') page: number) {
    const {
      results,
      total,
      pageTotal
    } = await this.defectPlaceService.findAll(place, { take, page });
    return {
      results: map(results, (obj) => {
        return this.sanitizeDefectPlace(obj);
      }),
      total,
      pageTotal
    };
  }

  // 엑셀샘플 다운로드
  @Get("sample-excel")
  // @Auth(['root', 'admin'])
  // @ApiBearerAuth()
  @ApiOperation({ summary: '하자현장엑셀샘플 다운로드 API' })
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=defect_place_sample.xlsx')
  async sampleExcel(@Res() res) {
    await this.defectPlaceService.sampleExcel(res);
  }

  @Get(':idx')
  @Auth(['root', 'admin', 'basic'])
  @ApiOperation({ summary: '하자현장 정보 API' })
  @ApiBearerAuth()
  async findOne(@Param('idx') idx: string) {
    const dfp = await this.defectPlaceService.findOne(+idx);
    return this.sanitizeDefectPlace(dfp);
  }

  @Patch(':idx')
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_하자현장수정 API' })
  @ApiBody({ type: CreateDefectPlaceDto })
  async update(@Param('idx') idx: string, @Body() updateDefectPlaceDto: UpdateDefectPlaceDto) {
    const dfp = await this.defectPlaceService.update(+idx, updateDefectPlaceDto);
    return this.sanitizeDefectPlace(dfp);
  }

  // 하자현장 삭제
  @Delete()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '하자현장삭제 API' })
  @HttpCode(204)
  async remove(@Body('idxs') idxs: []) {
    return await this.defectPlaceService.removes(idxs);
  }

  // 엑셀로 등록하는 기능
  @Post("excel/:idx")
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('excel'))
  @ApiOperation({ summary: '하자현장엑셀 업로드 API' })
  async uploadExcel(@Param('idx') idx: string, @UploadedFile() excel) {
    return await this.defectPlaceService.uploadExcel(idx, excel);
  }
}
