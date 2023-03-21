import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserDormantService } from './user-dormant.service';
import { CreateUserDormantDto } from './dto/create-user-dormant.dto';
import { UpdateUserDormantDto } from './dto/update-user-dormant.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';

@Controller('admin-user-dormant')
@ApiTags('휴면 회원(관리자) API')
export class AdminUserDormantController {
  constructor(private readonly userDormantService: UserDormantService) { }

  @Post()
  create(@Body() createUserDormantDto: CreateUserDormantDto) {
    return this.userDormantService.create(createUserDormantDto);
  }

  @Get()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({
    summary: '휴면회원 리스트 조회 API',
  })
  @ApiQuery({
    name: "search",
    description: 'search=id:휴면회원 id<br>'
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
    const { data } = await this.userDormantService.findAll({ take, page }, search, order);
    return { ...data };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userDormantService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDormantDto: UpdateUserDormantDto) {
  //   return this.userDormantService.update(+id, updateUserDormantDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userDormantService.remove(+id);
  // }
}
