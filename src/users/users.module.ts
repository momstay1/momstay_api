import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommonService } from 'src/common/common.service';
import { GroupsModule } from 'src/groups/groups.module';
import { AdminUsersController } from './admin-users.controller';
import { UserSnsModule } from 'src/user-sns/user-sns.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UsersEntity]),
    GroupsModule,
    UserSnsModule,
    FileModule,
    // forwardRef(() => FileModule),
  ],
  controllers: [UsersController, AdminUsersController],
  providers: [UsersService, CommonService],
  exports: [UsersService],
})
export class UsersModule { }
