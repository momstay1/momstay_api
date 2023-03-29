import { Module } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { PushNotificationController } from './push-notification.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushHistoryEntity } from './entities/push-history.entity';
import { UsersModule } from 'src/users/users.module';
import { AdminPushNotificationController } from './admin-push-notification.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PushHistoryEntity]),
    HttpModule,
    UsersModule
  ],
  controllers: [PushNotificationController, AdminPushNotificationController],
  providers: [PushNotificationService],
  exports: [PushNotificationService]
})
export class PushNotificationModule { }
