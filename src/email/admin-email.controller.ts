import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { EmailService } from './email.service';

@Controller('admin/email')
@ApiTags('이메일(관리자) API')
export class AdminEmailController {
  constructor(private readonly emailService: EmailService) { }

  @Get()
  @ApiOperation({ summary: '메일 리스트 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiQuery({
    name: "search",
    description: 'search=status:상태값(1:미사용|2:사용, 기본값:2)<br>'
      + 'search=group:(admin|host|guest)<br>'
      + 'search=type:메일 타입<br>'
      + 'search=code:메일 코드<br>'
    ,
    required: false
  })
  async findAll(
    @Query('search') search: string[],
  ) {
    const message = await this.emailService.emailFindAll(search);
    return { message };
  }

  @Patch(':idx')
  @ApiOperation({ summary: '메일 상태 수정 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiParam({
    name: 'idx',
    description: '메일 idx'
  })
  @ApiBody({
    schema: {
      properties: {
        status: { type: 'string' },
      }
    }
  })
  async update(
    @Param('idx') idx: string,
    @Body('status') status: string
  ) {
    return await this.emailService.update(+idx, status);
  }
}
