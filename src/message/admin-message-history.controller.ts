import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';

@Controller('admin/message-history')
@ApiTags('메시지 히스토리(관리자) API')
export class AdminMessageHistoryController {
  constructor(private readonly messageService: MessageService) { }

  @Get(':year/:month')
  @ApiOperation({ summary: '메시지 히스토리 리스트 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiParam({
    name: "year",
    description: '년도',
  })
  @ApiParam({
    name: "month",
    description: '월',
  })
  async findAll(
    @Param('year') year: string,
    @Param('month') month: string,
  ) {
    return await this.messageService.messageHistoryFindAll(year, month);
    // const messageType = await this.messageService.messageTypeFindAll();
    // return { message, messageType };
  }
}
