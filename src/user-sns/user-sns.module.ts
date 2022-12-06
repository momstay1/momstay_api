import { Module } from '@nestjs/common';
import { UserSnsService } from './user-sns.service';
import { UserSnsController } from './user-sns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSnsEntity } from './entities/user-sns.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSnsEntity]),
  ],
  controllers: [UserSnsController],
  providers: [UserSnsService],
  exports: [UserSnsService],
})
export class UserSnsModule { }
