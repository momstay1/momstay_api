import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommonService } from 'src/common/common.service';
import { GroupsModule } from 'src/groups/groups.module';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';
import { AdminUsersEntity } from './entities/admin-user.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    GroupsModule,
    TypeOrmModule.forFeature([AdminUsersEntity]),
  ],
  controllers: [AdminUsersController],
  providers: [AdminUsersService, CommonService],
  exports: [AdminUsersService],
})
export class AdminUsersModule { }
