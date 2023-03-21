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

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationEntity]),
    ProductOptionModule,
    UsersModule,
    FileModule,
    PushNotificationModule
    // ProductModule,
  ],
  controllers: [ReservationController, AdminReservationController],
  providers: [ReservationService],
  exports: [ReservationService]
})
export class ReservationModule { }
