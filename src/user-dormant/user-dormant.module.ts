import { Module } from '@nestjs/common';
import { UserDormantService } from './user-dormant.service';
import { UserDormantController } from './user-dormant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDormantEntity } from './entities/user-dormant.entity';
import { AdminUserDormantController } from './admin-user-dormant.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDormantEntity])
  ],
  controllers: [UserDormantController, AdminUserDormantController],
  providers: [UserDormantService],
  exports: [UserDormantService]
})
export class UserDormantModule { }
