import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportContentService } from './report-content.service';

@Controller('report-content')
@ApiTags('신고 내용 API')
export class ReportContentController {
  constructor(private readonly reportContentService: ReportContentService) { }

  // @Post()
  // async create(@Body() createReportCumulativeDto: CreateReportCumulativeDto) {
  //   return await this.reportContentService.create(createReportCumulativeDto);
  // }

  @Get()
  findAll() {
    return this.reportContentService.findAll();
  }

  @Get('group/:group')
  @ApiOperation({ summary: '신고 내용 그룹 조회 API' })
  async findGroup(@Param('group') group: string) {
    const reportContent = await this.reportContentService.findGroup(group);
    return { reportContent };
  }

  @Get(':idx')
  @ApiOperation({ summary: '신고 내용 상세 API' })
  async findOne(@Param('idx') idx: string) {
    return await this.reportContentService.findOne(+idx);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReportCumulativeDto: UpdateReportCumulativeDto) {
  //   return this.reportContentService.update(+id, updateReportCumulativeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportContentService.remove(+id);
  // }
}
