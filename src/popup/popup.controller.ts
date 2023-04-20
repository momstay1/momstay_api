import { Controller, Get } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Query } from '@nestjs/common/decorators';
import { PopupService } from './popup.service';
import { PopupEntity } from './entities/popup.entity';

@Controller('popup')
@ApiTags('팝업 API')
export class PopupController {
  constructor(private readonly popupService: PopupService) { }

  @Get('')
  @ApiOperation({ summary: '팝업 리스트 호출 API' })
  @ApiCreatedResponse({ type: PopupEntity })
  @ApiQuery({ name: 'id', description: 'popup id', required: false })
  @ApiQuery({ name: 'page', description: 'popup page', required: false })
  async getPopup(@Query('id') id: string, @Query('page') page: string) {
    return await this.popupService.getPopup(id, page);
  }
}
