import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { get, map } from 'lodash';
import { AdminUsersEntity } from 'src/admin-users/entities/admin-user.entity';
import { GetUser } from 'src/auth/getuser.decorator';
import { commonUtils } from 'src/common/common.utils';
import { Auth } from 'src/common/decorator/role.decorator';
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
    return commonUtils.sanitizeEntity(bc, this.boardContentsService.getPrivateColumn());
  };

  @Post()
  @ApiOperation({ summary: '게시글 생성 API' })
  @ApiCreatedResponse({ type: CreateBoardContentDto })
  @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  @ApiBearerAuth()
  @Auth(['Any'])
  async create(@GetUser() user: UsersEntity, @Body() createBoardContentDto: CreateBoardContentDto) {
    return await this.boardContentsService.create(user, createBoardContentDto);
  }

  @Get(':bd_idx')
  @ApiOperation({ summary: '게시글 리스트 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  @ApiQuery({ name: "category", required: false })
  @ApiQuery({ name: "order", required: false })
  async findCategoryAll(
    @Param('bd_idx') bd_idx: string,
    @Query('category') category: string,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('order') order: string,
  ) {
    const {
      bc: {
        results,
        total,
        pageTotal
      },
      bcats
    } = await this.boardContentsService.findCategoryAll(bd_idx, category, { take, page }, order);
    return { bcats, total, pageTotal, results };
  }

  @Get(':bd_idx/:bc_idx')
  @ApiOperation({ summary: '게시글 상세 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  async findOne(@Param('bd_idx') bd_idx: number, @Param('bc_idx') bc_idx: number) {
    const bc = await this.boardContentsService.findOne(bc_idx);
    return bc;
  }

  @Patch(':bc_idx')
  @Auth(['Any'])
  @ApiBearerAuth()
  async update(
    @GetUser() user: UsersEntity,
    @Param('bc_idx') bc_idx: string,
    @Body() updateBoardContentDto: UpdateBoardContentDto
  ) {
    const bc = await this.boardContentsService.update(user, +bc_idx, updateBoardContentDto);
    return this.sanitizeBoardContent(bc);
  }
}
