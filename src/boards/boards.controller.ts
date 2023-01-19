import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { commonUtils } from 'src/common/common.utils';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@ApiTags('게시판 API')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) { }

  // @Post()
  // create(@Body() createBoardDto: CreateBoardDto) {
  //   return this.boardsService.create(createBoardDto);
  // }

  @Get()
  @ApiOperation({ summary: '게시판 리스트 API' })
  async findAll() {
    return await this.boardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '게시판 정보 API' })
  async findOne(@Param('id') id: string) {
    return await this.boardsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
  //   return this.boardsService.update(+id, updateBoardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.boardsService.remove(+id);
  // }
}
