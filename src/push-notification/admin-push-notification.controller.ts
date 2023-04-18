import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';

@Controller('admin/push-notification')
@ApiTags('알림(관리자) API')
export class AdminPushNotificationController {
  constructor(private readonly pushNotificationService: PushNotificationService) { }

  @Post()
  @ApiOperation({ summary: '관리자 알림 보내기 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  async create(@Body() createPushNotificationDto: CreatePushNotificationDto) {
    return await this.pushNotificationService.create(createPushNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: '관리자 알림 리스트 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    description: 'search=year:년도<br>'
      + 'search=month:월',
    required: false
  })
  @ApiQuery({
    name: "order",
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
    required: false
  })
  async adminFindAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string
  ) {
    const { data } = await this.pushNotificationService.adminFindAll({ take, page }, search, order);
    return { ...data };
  }

  @Get(':idx')
  @ApiOperation({ summary: '관리자 알림 리스트 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  async findOne(@Param('idx') idx: string) {
    return await this.pushNotificationService.findOne(+idx);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePushNotificationDto: UpdatePushNotificationDto) {
  //   return this.pushNotificationService.update(+id, updatePushNotificationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pushNotificationService.remove(+id);
  // }
}
