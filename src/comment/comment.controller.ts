import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
