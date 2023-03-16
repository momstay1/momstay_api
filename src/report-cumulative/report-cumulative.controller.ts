import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReportCumulativeService } from './report-cumulative.service';
import { CreateReportCumulativeDto } from './dto/create-report-cumulative.dto';
import { UpdateReportCumulativeDto } from './dto/update-report-cumulative.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';

@Controller('report-cumulative')
@ApiTags('신고 API')
export class ReportCumulativeController {
  constructor(private readonly reportCumulativeService: ReportCumulativeService) { }

  @Post()
  @ApiOperation({ summary: '신고 등록 API' })
  @Auth(['Any'])
  @ApiBearerAuth()
  async create(
    @GetUser() user: UsersEntity,
    @Body() createReportCumulativeDto: CreateReportCumulativeDto
  ) {
    return await this.reportCumulativeService.create(user, createReportCumulativeDto);
  }

  @Get()
  @ApiOperation({ summary: '신고 내역 리스트 조회 API (미사용)' })
  @Auth(['admin', 'root'])
  @ApiBearerAuth()
  @ApiQuery({
    name: "order",
    description: 'ex) createdAt:DESC',
    required: false
  })
  async findAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('order') order: string
  ) {
    const { data } = await this.reportCumulativeService.findAll({ take, page }, order);
    return { ...data };
  }

  @Get(':idx')
  @ApiOperation({ summary: '신고 내역 상세 조회 API (미사용)' })
  @Auth(['admin', 'root'])
  @ApiBearerAuth()
  async findOne(@Param('idx') idx: string) {
    const reportCumulative = await this.reportCumulativeService.findOneIdx(+idx);
    return { reportCumulative };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportCumulativeDto: UpdateReportCumulativeDto) {
    return this.reportCumulativeService.update(+id, updateReportCumulativeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportCumulativeService.remove(+id);
  }
}
