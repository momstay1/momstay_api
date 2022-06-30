import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommonService } from 'src/common/common.service';
import { AdminUsersModule } from 'src/admin-users/admin-users.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => AdminUsersModule),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService, CommonService],
  exports: [UsersService],
})
export class UsersModule { }
