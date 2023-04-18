import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AdminDashboardController } from './admin-dashboard.controller';
import { AdminUsersModule } from 'src/admin-users/admin-users.module';
import { UsersModule } from 'src/users/users.module';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';
import { ReservationModule } from 'src/reservation/reservation.module';
import { OrderTotalModule } from 'src/order-total/order-total.module';

@Module({
  imports: [
    UsersModule,
    AdminUsersModule,
    ProductModule,
    OrderModule,
    OrderTotalModule,
    ReservationModule,
  ],
  controllers: [AdminDashboardController],
  providers: [DashboardService]
})
export class DashboardModule { }
