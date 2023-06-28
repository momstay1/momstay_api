import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { ProductOptionModule } from 'src/product-option/product-option.module';
import { UsersModule } from 'src/users/users.module';
import { FileModule } from 'src/file/file.module';
import { PushNotificationModule } from 'src/push-notification/push-notification.module';
import { AdminReservationController } from './admin-reservation.controller';
import { ExcelService } from 'src/excel/excel.service';
import { EmailModule } from 'src/email/email.module';
import { MessageModule } from 'src/message/message.module';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationEntity]),
    ProductOptionModule,
    UsersModule,
    FileModule,
    PushNotificationModule,
    EmailModule,
    MessageModule,
    SettingsModule
    // ProductModule,
  ],
  controllers: [ReservationController, AdminReservationController],
  providers: [ReservationService, ExcelService],
  exports: [ReservationService]
})
export class ReservationModule { }
