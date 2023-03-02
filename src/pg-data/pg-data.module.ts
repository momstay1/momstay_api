import { Module } from '@nestjs/common';
import { PgDataService } from './pg-data.service';
import { PgDataController } from './pg-data.controller';
import { PgDataEntity } from './entities/pg-data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PgDataEntity]),
  ],
  controllers: [PgDataController],
  providers: [PgDataService],
  exports: [PgDataService]
})
export class PgDataModule { }
