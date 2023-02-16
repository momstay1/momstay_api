import { Module } from '@nestjs/common';
import { PgNotiService } from './pg-noti.service';
import { PgNotiController } from './pg-noti.controller';

@Module({
  controllers: [PgNotiController],
  providers: [PgNotiService]
})
export class PgNotiModule {}
