import { Module } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { PushNotificationController } from './push-notification.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushHistoryEntity } from './entities/push-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PushHistoryEntity]),
    HttpModule
  ],
  controllers: [PushNotificationController],
  providers: [PushNotificationService],
  exports: [PushNotificationService]
})
export class PushNotificationModule { }
