import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { map } from 'lodash';
import { GetUser } from 'src/auth/getuser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { commonUtils } from 'src/common/common-utils';
import { ResponseErrorDto } from 'src/error/dto/response-error.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
import { BoardContentsService } from './board-contents.service';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
import { BoardContentsEntity } from './entities/board-content.entity';

@Controller('board-contents')
@ApiTags('게시글 API')
export class BoardContentsController {
  constructor(private readonly boardContentsService: BoardContentsService) { }

  sanitizeBoardContent = (bc) => {
    return commonUtils.sanitizeEntity(bc, this.boardContentsService.getPrivateModel());
  };

  @Post(':bd_idx')
  @ApiOperation({ summary: '게시글 생성 API' })
  @ApiCreatedResponse({ type: CreateBoardContentDto })
  @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Param('bd_idx') bd_idx: number, @GetUser() user: UsersEntity, @Body() createBoardContentDto: CreateBoardContentDto) {
    return await this.boardContentsService.create(bd_idx, user.user_id, createBoardContentDto);
  }

  @Get()
  @ApiOperation({ summary: '게시글 전체 리스트 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  async findAll(@Query('take') take: number, @Query('page') page: number) {
    const {
      results,
      total,
      pageTotal
    } = await this.boardContentsService.findAll({ take, page });
    const data = map(results, (obj) => {
      return this.sanitizeBoardContent(obj);
    });
    return {
      results: data,
      total,
      pageTotal
    };
  }

  @Get(':category')
  @ApiOperation({ summary: '게시글 카테고리 리스트 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  async findCategoryAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Param('category') category: string
  ) {
    const {
      bc: {
        results,
        total,
        pageTotal
      },
      bcats
    } = await this.boardContentsService.findCategoryAll({ take, page }, category);
    const data = map(results, (obj) => {
      return this.sanitizeBoardContent(obj);
    });
    return { bcats, results: data, total, pageTotal };
  }

  @Get(':idx')
  @ApiOperation({ summary: '게시글 상세 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  async findOne(@Param('idx') idx: number) {
    const bc = await this.boardContentsService.findOne(idx);
    return this.sanitizeBoardContent(bc);
  }

  @Patch(':category/:id')
  update(@Param('id') id: string, @Body() updateBoardContentDto: UpdateBoardContentDto) {
    return this.boardContentsService.update(+id, updateBoardContentDto);
  }

  @Delete(':category/:id')
  remove(@Param('id') id: string) {
    return this.boardContentsService.remove(+id);
  }
}
