import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { CreateMypageDto } from './dto/create-mypage.dto';
import { UpdateMypageDto } from './dto/update-mypage.dto';
import { Auth } from 'src/common/decorator/role.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';
import { BoardContentsEntity } from 'src/board-contents/entities/board-content.entity';
import { BoardContentsService } from 'src/board-contents/board-contents.service';

@Controller('mypage')
@ApiTags('마이페이지 API')
export class MypageController {
  constructor(
    private readonly mypageService: MypageService,
    private readonly boardContentsService: BoardContentsService,
  ) {}

  @Post()
  create(@Body() createMypageDto: CreateMypageDto) {
    return this.mypageService.create(createMypageDto);
  }

  @Get()
  findAll() {
    return this.mypageService.findAll();
  }

  @Get('bc/:bd_idx')
  @Auth(['Any'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '내가 작성한 글 리스트 API' })
  @ApiCreatedResponse({ type: BoardContentsEntity })
  @ApiQuery({ name: "category", required: false })
  @ApiQuery({ name: "order", required: false })
  async findUserCategoryAll(
    @GetUser() user: UsersEntity,
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
    } = await this.boardContentsService.findUserCategoryAll(bd_idx, category, { take, page }, order, user);
    return { bcats, total, pageTotal, results };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mypageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMypageDto: UpdateMypageDto) {
    return this.mypageService.update(+id, updateMypageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mypageService.remove(+id);
  }
}
