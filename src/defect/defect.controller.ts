import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  Res,
  HttpCode
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { map } from 'lodash';
import { GetUser } from 'src/auth/getuser.decorator';
import { multerOptions } from 'src/common/common.file';
import { commonUtils } from 'src/common/common.utils';
import { Auth } from 'src/common/decorator/role.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';
import { dftConstant } from './constants';
import { DefectService } from './defect.service';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';

const createDefectBody = dftConstant.createDefectBody;
@Controller('defect')
@ApiTags('하자관리 API')
export class DefectController {
  constructor(private readonly defectService: DefectService) { }

  sanitizeDefect(data) {
    return commonUtils.sanitizeEntity(data, this.defectService.getPrivateColumn());
  };

  @Post()
  @Auth(['root', 'admin', 'basic'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '하자 등록 API' })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'dft_origin_img', maxCount: 10 },
    { name: 'dft_info_img', maxCount: 10 },
  ], multerOptions()))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { ...createDefectBody }
    }
  })
  async create(
    @GetUser() user: UsersEntity,
    @Body() createDefectDto: CreateDefectDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return await this.defectService.create(user, createDefectDto, files);
  }

  @Get()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_현장 하자관리 리스트 API' })
  async findAll(
    @Query('place') place: number,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('order') order: string,
    @Query('sort') sort: string,
    @Query('search') search: string[],
  ) {
    const {
      results,
      total,
      pageTotal
    } = await this.defectService.findAll(place, { take, page }, { order, sort }, search);
    return {
      results: map(results, (obj) => {
        return this.sanitizeDefect(obj);
      }),
      total,
      pageTotal
    };
  }

  // 하자리스트 엑셀 다운로드
  @Get("excel/:place_idx")
  @ApiOperation({ summary: '하자리스트 엑셀 다운로드 API' })
  async sampleExcel(@Param('place_idx') place_idx, @Res() res) {
    const excel_file = await this.defectService.excel(place_idx);
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="' + excel_file.file_name + '"',
    });
    createReadStream(excel_file.file_path).pipe(res);
  }

  @Get(':dft_idx')
  async findOne(@Param('dft_idx') dft_idx: string) {
    return await this.defectService.findOne(+dft_idx);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefectDto: UpdateDefectDto) {
    return this.defectService.update(+id, updateDefectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defectService.remove(+id);
  }

  // 현장 상태 일괄 변경
  @Delete()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_하자 일괄 삭제 API' })
  @ApiBody({
    schema: {
      properties: {
        idxs: { example: [] }
      }
    }
  })
  @HttpCode(204)
  async statusUpdate(@Body('idxs') idxs: []) {
    await this.defectService.removes(idxs);
  }
}
