import { Module } from '@nestjs/common';
import { PgDataService } from './pg-data.service';
import { PgDataController } from './pg-data.controller';

@Module({
  controllers: [PgDataController],
  providers: [PgDataService]
})
export class PgDataModule {}
