import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AdminUsersModule } from 'src/admin-users/admin-users.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    AdminUsersModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule { }
