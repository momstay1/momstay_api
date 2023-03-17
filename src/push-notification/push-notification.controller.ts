import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';

@Controller('push-notification')
@ApiTags('알림 API')
export class PushNotificationController {
  constructor(private readonly pushNotificationService: PushNotificationService) { }

  @Post()
  create(@Body() createPushNotificationDto: CreatePushNotificationDto) {
    return this.pushNotificationService.create(createPushNotificationDto);
  }

  @Get('test')
  @ApiOperation({
    summary: 'app push test',
    description: 'topic, token 둘중 하나만 설정 필요'
  })
  @ApiQuery({
    name: "topic",
    description: 'topic전달 값 token 빈값으로 설정',
    required: false
  })
  @ApiQuery({
    name: "token",
    description: 'token전달 값 topic 빈값으로 설정',
    required: false
  })
  @ApiQuery({
    name: "title",
    description: '앱 푸시 제목',
    required: false
  })
  @ApiQuery({
    name: "body",
    description: '앱 푸시 설명',
    required: false
  })
  async test(
    @Query('topic') topic: string,
    @Query('token') token: string,
    @Query('title') title: string,
    @Query('body') body: string,
  ) {
    const target = {
      // token: 'cJfclSYOSzOS86FH2TQHOz:APA91bGHhZpeZ3sg90Q6RnuPTCtWwJ_y0o3nVyh-xPCOQXYlj4XZb_HLHyp7gQFEY56YcIQPmZjUwSVNfZuOienzIkc2KYZoIJQyYToH4ZJ6T6EPZE_EMcZFNEtE4Z5riCpmazJRjJxE',
      // token: '5BAA98BFE537F9A4577F2899A647F122A0C9436F1421024A678E3211C93672C2',
      token: '',
      topic: 'marketing',
      // topic: '',
    }
    const notifications = {
      title: '앱 푸시 테스트',
      body: '앱 푸시 테스트 입니다.',
      // data: {}
    };
    if (topic) {
      target['topic'] = topic;
      target['token'] = '';
    }
    if (token) {
      target['token'] = token;
      target['topic'] = '';
    }
    if (title) {
      notifications['title'] = title;
    }
    if (body) {
      notifications['body'] = body;
    }
    await this.pushNotificationService.sendPush(target, notifications);
  }

  @Get()
  @ApiOperation({ summary: '알림 리스트 API' })
  @Auth(['Any'])
  @ApiBearerAuth()
  @ApiQuery({
    name: "search",
    // description: 'search=status:상태값(200:성공|400:실패, 기본값:200)<br>',
    required: false
  })
  @ApiQuery({
    name: "order",
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
    required: false
  })
  async findAll(
    @GetUser() user: UsersEntity,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string
  ) {
    const { data } = await this.pushNotificationService.findAll({ take, page }, search, order, user);
    return { ...data };
  }

  @Get('nonmember')
  @ApiOperation({ summary: '비회원 알림 리스트 API' })
  @ApiQuery({
    name: "search",
    // description: 'search=status:상태값(200:성공|400:실패, 기본값:200)<br>',
    required: false
  })
  @ApiQuery({
    name: "order",
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
    required: false
  })
  async findAllNonMember(
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string
  ) {
    const { data } = await this.pushNotificationService.findAll({ take, page }, search, order);
    return { ...data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pushNotificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePushNotificationDto: UpdatePushNotificationDto) {
    return this.pushNotificationService.update(+id, updatePushNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pushNotificationService.remove(+id);
  }
}
