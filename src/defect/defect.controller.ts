import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { map } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { Auth } from 'src/common/decorator/role.decorator';
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
  create(@Body() createDefectDto: CreateDefectDto) {
    return this.defectService.create(createDefectDto);
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
