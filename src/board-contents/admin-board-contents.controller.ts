import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
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
import { createReadStream } from 'fs';

@Controller('admin/board-contents')
@ApiTags('게시글(관리자) API')
export class AdminBoardContentsController {
  constructor(private readonly boardContentsService: BoardContentsService) {}

  sanitizeBoardContent = (bc) => {
    return commonUtils.sanitizeEntity(
      bc,
      this.boardContentsService.getPrivateColumn(),
    );
  };

  @Post()
  @ApiOperation({ summary: '관리자 게시글 생성 API' })
  @ApiCreatedResponse({ type: CreateBoardContentDto })
  @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  @ApiBearerAuth()
  @Auth(['Any'])
  async create(
    @GetUser() user: UsersEntity,
    @Body() createBoardContentDto: CreateBoardContentDto,
  ) {
    return await this.boardContentsService.create(user, createBoardContentDto);
  }

  @Post('status-change')
  @ApiOperation({ summary: '관리자 게시글 상태 일괄 변경 API' })
  @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  @ApiBearerAuth()
  @Auth(['root', 'admin'])
  @ApiBody({
    schema: {
      properties: {
        status: { type: 'string' },
        bc_idxs: { example: [] },
      },
    },
  })
  async statusChange(@Body() statusChange) {
    await this.boardContentsService.statusChange(statusChange);
  }

  @Post('type-change')
  @ApiOperation({ summary: '관리자 게시글 타입 일괄 변경 API' })
  @ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
  @ApiBearerAuth()
  @Auth(['root', 'admin'])
  @ApiBody({
    schema: {
      properties: {
        type: { type: 'string' },
        bc_idxs: { example: [] },
      },
    },
  })
  async typeChange(@Body() statusChange) {
    await this.boardContentsService.typeChange(statusChange);
  }

  @Get('/:bd_idx')
  @ApiOperation({ summary: '관리자 게시글 리스트 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  @ApiQuery({
    name: 'search',
    description:
      '' +
      'search=status:상태검색 (0: 삭제, 1:미등록 2: 등록, 3:답변대기, 4: 답변완료<br>' +
      'search=name:작성자명<br>' +
      'search=id:작성자 id<br>',
    required: false,
  })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'order', required: false })
  async findCategoryAll(
    @Param('bd_idx') bd_idx: string,
    @Query('category') category: string,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string,
  ) {
    const { bc, bcats } = await this.boardContentsService.adminFindCategoryAll(
      bd_idx,
      category,
      { take, page },
      search,
      order,
    );
    // const data = map(results, (obj) => {
    //   return this.sanitizeBoardContent(obj);
    // });
    return { bcats, ...bc };
  }

  @Get(':bd_idx/excel')
  @ApiOperation({ summary: '관리자 게시글 리스트 엑셀 다운로드 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  @ApiQuery({
    name: 'search',
    description:
      '' +
      'search=status:상태검색 (0: 삭제, 1:미등록 2: 등록, 3:답변대기, 4: 답변완료<br>' +
      'search=name:작성자명<br>' +
      'search=id:작성자 id<br>',
    required: false,
  })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'order', required: false })
  async excelDownload(
    @Param('bd_idx') bd_idx: string,
    @Query('category') category: string,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string,
    @Res() res,
  ) {
    const excel_file = await this.boardContentsService.createExcel(
      bd_idx,
      category,
      { take, page },
      search,
      order,
    );
    // 엑셀 다운로드
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition':
        'attachment; filename="' + excel_file.file_name + '"',
    });
    createReadStream(excel_file.file_path).pipe(res);
  }

  @Get(':bd_idx/:bc_idx')
  @ApiOperation({ summary: '관리자 게시글 상세 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  async findOne(
    @Param('bd_idx') bd_idx: number,
    @Param('bc_idx') bc_idx: number,
  ) {
    const bc = await this.boardContentsService.findBdBcIndex(bc_idx);
    return bc;
  }

  @Patch(':bc_idx')
  @ApiOperation({ summary: '관리자 게시글 수정 API' })
  @ApiBearerAuth()
  @Auth(['root', 'admin'])
  async update(
    @GetUser() user: AdminUsersEntity,
    @Param('bc_idx') bc_idx: number,
    @Body() updateBoardContentDto: UpdateBoardContentDto,
  ) {
    const bc = await this.boardContentsService.update(
      user,
      bc_idx,
      updateBoardContentDto,
    );
    return bc;
  }
}
