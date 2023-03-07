import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/getuser.decorator';
import { Auth } from 'src/common/decorator/role.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@ApiTags('댓글 API')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  @ApiOperation({ summary: '회원 댓글 등록 API' })
  @Auth(['Any'])
  @ApiBearerAuth()
  async create(
    @GetUser() user: UsersEntity,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentService.create(user, createCommentDto);
  }

  @Get(':category/:foreignIdx')
  @ApiOperation({ summary: '댓글 리스트 조회 API' })
  @ApiParam({
    name: "category",
    description: 'comment category값(ex 게시글 조회시 "bc")',
  })
  @ApiParam({
    name: "foreignIdx",
    description: 'comment foreignIdx(ex 게시글 조회시 "게시글 idx")',
  })
  async findAll(
    @Param('category') category: string,
    @Param('foreignIdx') foreignIdx: string,
    @Query('take') take: number,
    @Query('page') page: number,
  ) {
    const {
      data: {
        results,
        total,
        pageTotal
      }
    } = await this.commentService.findAll(category, +foreignIdx, { take, page });

    return { results, total, pageTotal };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':idx')
  @ApiOperation({
    summary: '회원 댓글 수정 API',
    description: '댓글 삭제인 경우만 status 1 입력<br>'
      + 'contents는 댓글 내용 수정시 사용',
  })
  @Auth(['Any'])
  @ApiBearerAuth()
  @ApiParam({
    name: "idx",
    description: 'comment idx값',
  })
  @ApiBody({
    schema: {
      example: {
        status: 'string',
        contents: 'string'
      }
    }
  })
  async update(
    @Param('idx') idx: string,
    @GetUser() user: UsersEntity,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    return await this.commentService.update(+idx, user, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
