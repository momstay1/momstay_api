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
import { LoginModule } from 'src/login/login.module';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { IamportService } from 'src/iamport/iamport.service';
import { DeviceModule } from 'src/device/device.module';
import { UserLeaveModule } from 'src/user-leave/user-leave.module';
import { UserDormantModule } from 'src/user-dormant/user-dormant.module';
import { ExcelService } from 'src/excel/excel.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UsersEntity]),
    GroupsModule,
    UserSnsModule,
    FileModule,
    EmailModule,
    LoginModule,
    RefreshTokenModule,
    DeviceModule,
    UserLeaveModule,
    UserDormantModule,
    // forwardRef(() => FileModule),
  ],
  controllers: [UsersController, AdminUsersController],
  providers: [UsersService, CommonService, IamportService, ExcelService],
  exports: [UsersService],
})
export class UsersModule { }
