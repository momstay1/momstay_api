import { Module } from '@nestjs/common';
import { PgCancelService } from './pg-cancel.service';
import { PgCancelController } from './pg-cancel.controller';

@Module({
  controllers: [PgCancelController],
  providers: [PgCancelService]
})
export class PgCancelModule {}
