import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserLeaveService } from './user-leave.service';
import { CreateUserLeaveDto } from './dto/create-user-leave.dto';
import { UpdateUserLeaveDto } from './dto/update-user-leave.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';

@Controller('admin/user-leave')
@ApiTags('탈퇴 회원(관리자) API')
export class AdminUserLeaveController {
  constructor(private readonly userLeaveService: UserLeaveService) { }

  // @Post()
  // create(@Body() createUserLeaveDto: CreateUserLeaveDto) {
  //   return this.userLeaveService.create(createUserLeaveDto);
  // }

  @Get()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({
    summary: '탈퇴회원 리스트 조회 API',
  })
  @ApiQuery({
    name: "search",
    description: 'search=id:탈퇴회원 id<br>'
      + 'search=name:이름<br>'
    ,
    required: false
  })
  @ApiQuery({
    name: "order",
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>'
    ,
    required: false
  })
  async findAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string
  ) {
    const { data } = await this.userLeaveService.findAll({ take, page }, search, order);
    return { ...data };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userLeaveService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserLeaveDto: UpdateUserLeaveDto) {
  //   return this.userLeaveService.update(+id, updateUserLeaveDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userLeaveService.remove(+id);
  // }
}
