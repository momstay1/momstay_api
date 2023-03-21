import { Module } from '@nestjs/common';
import { UserLeaveService } from './user-leave.service';
import { UserLeaveController } from './user-leave.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLeaveEntity } from './entities/user-leave.entity';
import { AdminUserLeaveController } from './admin-user-leave.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLeaveEntity])
  ],
  controllers: [UserLeaveController, AdminUserLeaveController],
  providers: [UserLeaveService],
  exports: [UserLeaveService]
})
export class UserLeaveModule { }
