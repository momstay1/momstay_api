import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { get, map } from 'lodash';
import { AdminUsersEntity } from 'src/admin-users/entities/admin-user.entity';
import { GetUser } from 'src/auth/getuser.decorator';
import { commonUtils } from 'src/common/common.utils';
import { Auth } from 'src/common/decorator/role.decorator';
import { ResponseErrorDto } from 'src/error/dto/response-error.dto';
import { BoardContentsService } from './board-contents.service';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
import { BoardContentsEntity } from './entities/board-content.entity';

@Controller('admin/board-contents')
@ApiTags('관리자 게시글 API')
export class AdminBoardContentsController {
  constructor(private readonly boardContentsService: BoardContentsService) { }

  sanitizeBoardContent = (bc) => {
    return commonUtils.sanitizeEntity(bc, this.boardContentsService.getPrivateColumn());
  };

  @Post()
  @ApiOperation({ summary: '관리자 게시글 생성 API' })
  @ApiCreatedResponse({ type: CreateBoardContentDto })
  @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  @ApiBearerAuth()
  @Auth(['Any'])
  async create(@GetUser() user: AdminUsersEntity, @Body() createBoardContentDto: CreateBoardContentDto) {
    return await this.boardContentsService.create(user, createBoardContentDto);
  }

  @Post('status-change')
  @ApiOperation({ summary: '관리자 게시글 상태 일괄 변경 API' })
  @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  @ApiBearerAuth()
  @Auth(['root'])
  @ApiBody({
    schema: {
      properties: {
        status: { type: 'string' },
        bc_idxs: { example: [] }
      }
    }
  })
  async statusChange(@Body() statusChange) {
    return await this.boardContentsService.statusChange(statusChange);
  }

  @Get(':bd_idx')
  @ApiOperation({ summary: '관리자 게시글 리스트 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  async findCategoryAll(
    @Param('bd_idx') bd_idx: string,
    @Query('category') category: string,
    @Query('take') take: number,
    @Query('page') page: number,
  ) {
    const {
      bc: {
        results,
        total,
        pageTotal
      },
      bcats
    } = await this.boardContentsService.adminFindCategoryAll(bd_idx, category, { take, page });
    const data = map(results, (obj) => {
      return this.sanitizeBoardContent(obj);
    });
    return { bcats, results: data, total, pageTotal };
  }

  @Get(':bd_idx/:bc_idx')
  @ApiOperation({ summary: '관리자 게시글 상세 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  async findOne(@Param('bd_idx') bd_idx: number, @Param('bc_idx') bc_idx: number) {
    const bc = await this.boardContentsService.findBdBcIndex(bd_idx, bc_idx);
    return this.sanitizeBoardContent(bc);
  }

  @Patch(':bc_idx')
  @ApiOperation({ summary: '관리자 게시글 수정 API' })
  @ApiBearerAuth()
  @Auth(['root'])
  async update(
    @GetUser() user: AdminUsersEntity,
    @Param('bc_idx') bc_idx: string,
    @Body() updateBoardContentDto: UpdateBoardContentDto
  ) {
    const bc = await this.boardContentsService.update(user, +bc_idx, updateBoardContentDto);
    return this.sanitizeBoardContent(bc);
  }
}
