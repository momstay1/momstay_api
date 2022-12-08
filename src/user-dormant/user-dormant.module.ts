import { Module } from '@nestjs/common';
import { UserDormantService } from './user-dormant.service';
import { UserDormantController } from './user-dormant.controller';

@Module({
  controllers: [UserDormantController],
  providers: [UserDormantService]
})
export class UserDormantModule {}
