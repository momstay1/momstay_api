import { Module } from '@nestjs/common';
import { UserLeaveService } from './user-leave.service';
import { UserLeaveController } from './user-leave.controller';

@Module({
  controllers: [UserLeaveController],
  providers: [UserLeaveService]
})
export class UserLeaveModule {}
