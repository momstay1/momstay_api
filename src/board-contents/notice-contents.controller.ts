import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { map } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { BoardContentsService } from './board-contents.service';
import { BoardContentsEntity } from './entities/board-content.entity';

@Controller('notice-contents')
@ApiTags('공지사항 게시글 API')
export class NoticeContentsController {
  constructor(private readonly boardContentsService: BoardContentsService) { }

  sanitizeBoardContent = (bc) => {
    return commonUtils.sanitizeEntity(bc, this.boardContentsService.getPrivateColumn());
  };

  @Get()
  @ApiOperation({ summary: '공지사항 게시글 전체 리스트 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  async findAll() {
    const bc = await this.boardContentsService.findNoticeAll();
    return map(bc, (obj) => {
      return this.sanitizeBoardContent(obj);
    });
  }

  @Get(':category')
  @ApiOperation({ summary: '공지사항 게시글 카테고리 리스트 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  async findCategoryAll(@Param('category') category: string) {
    const bc = await this.boardContentsService.findNoticeCategoryAll(category);
    return map(bc, (obj) => {
      return this.sanitizeBoardContent(obj);
    });
  }
}
