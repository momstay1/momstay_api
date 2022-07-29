import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { map } from 'lodash';
import { GetUser } from 'src/auth/getuser.decorator';
import { multerOptions } from 'src/common/common.file';
import { commonUtils } from 'src/common/common.utils';
import { Auth } from 'src/common/decorator/role.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';
import { DefectService } from './defect.service';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefectDto: UpdateDefectDto) {
    return this.defectService.update(+id, updateDefectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defectService.remove(+id);
  }
}
