import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { map } from 'lodash';
import { BoardCategoriesService } from './board-categories.service';

@Controller('board-categories')
@ApiTags('게시판 카테고리 API')
export class BoardCategoriesController {
  constructor(private readonly boardCategoriesService: BoardCategoriesService) { }

  @Get()
  async findAll() {
    return await this.boardCategoriesService.findAll();
  }
}
