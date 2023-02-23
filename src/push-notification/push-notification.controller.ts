import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';

@Controller('push-notification')
export class PushNotificationController {
  constructor(private readonly pushNotificationService: PushNotificationService) { }

  @Post()
  create(@Body() createPushNotificationDto: CreatePushNotificationDto) {
    return this.pushNotificationService.create(createPushNotificationDto);
  }

  @Get('test')
  async test() {
    const target = {
      // token: 'cJfclSYOSzOS86FH2TQHOz:APA91bGHhZpeZ3sg90Q6RnuPTCtWwJ_y0o3nVyh-xPCOQXYlj4XZb_HLHyp7gQFEY56YcIQPmZjUwSVNfZuOienzIkc2KYZoIJQyYToH4ZJ6T6EPZE_EMcZFNEtE4Z5riCpmazJRjJxE',
      token: '',
      topic: 'all',
      // topic: '',
    }
    const notifications = {
      title: '앱 푸시 테스트',
      body: '앱 푸시 테스트 입니다.',
      data: { status: 200 }
    };
    return await this.pushNotificationService.sendPush(target, notifications);
  }

  @Get()
  findAll() {
    return this.pushNotificationService.findAll();
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
