import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';

@Controller('admin/message')
@ApiTags('메시지(관리자) API')
export class AdminMessageController {
  constructor(private readonly messageService: MessageService) { }

  // @Post()
  // create(@Body() createMessageDto: CreateMessageDto) {
  //   return this.messageService.create(createMessageDto);
  // }

  @Get()
  @ApiOperation({ summary: '메시지 리스트 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiQuery({
    name: "search",
    description: 'search=status:상태값(1:미사용|2:사용, 기본값:2)<br>'
      + 'search=group:(admin|host|guest)<br>'
      + 'search=type:메시지 타입<br>'
      + 'search=sendtype:발송 타입(alimtalk|sms)<br>'
      + 'search=code:메시지코드<br>'
    ,
    required: false
  })
  async findAll(
    @Query('search') search: string[],
  ) {
    const message = await this.messageService.messageFindAll(search);
    const messageType = await this.messageService.messageTypeFindAll();
    return { message, messageType };
  }

  @Get(':code')
  @ApiOperation({ summary: '메시지 조회(비즈엠 템플릿 조회) API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiParam({
    name: 'code',
    description: '비즈엠 템플릿 코드 message.code'
  })
  async findOne(
    @Param('code') code: string,
  ) {
    return await this.messageService.messageFindOne(code);
  }

  @Get('test')
  @ApiOperation({ summary: '메시지 발송 테스트 API' })
  async test(
    @Query('phone') phone: string,
    @Query('type') type: string,
  ) {
    const data = {
      shop: 1111,
      name_order: 'test',
      ord_code: 'd82he',
      ordp_title: '테스트상품 외 1',
      total_pay_price: 50000
    };
    await this.messageService.send([phone], type, data);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.messageService.findOne(+id);
  // }

  @Patch(':idx')
  @ApiOperation({ summary: '메시지 상태 및 템플릿 수정 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiParam({
    name: 'idx',
    description: '메시지 idx'
  })
  @ApiBody({
    schema: {
      properties: {
        status: { type: 'string' },
        tmpl: { type: 'string' },
      }
    }
  })
  async update(
    @Param('idx') idx: string,
    @Body('status') status: string,
    @Body('tmpl') tmpl: string
  ) {
    return await this.messageService.update(+idx, status, tmpl);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messageService.remove(+id);
  // }
}
