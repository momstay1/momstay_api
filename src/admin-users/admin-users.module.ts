import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommonService } from 'src/common/common.service';
import { UsersModule } from 'src/users/users.module';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';
import { AdminUsersEntity } from './entities/admin-user.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([AdminUsersEntity]),
  ],
  controllers: [AdminUsersController],
  providers: [AdminUsersService, CommonService],
  exports: [AdminUsersService],
})
export class AdminUsersModule { }
