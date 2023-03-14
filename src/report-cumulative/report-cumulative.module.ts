import { Module } from '@nestjs/common';
import { ReportCumulativeService } from './report-cumulative.service';
import { ReportCumulativeController } from './report-cumulative.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportCumulativeEntity } from './entities/report-cumulative.entity';
import { UsersModule } from 'src/users/users.module';
import { ReportContentEntity } from './entities/report-content.entity';
import { ReportContentService } from './report-content.service';
import { ReportContentController } from './report-content.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportCumulativeEntity, ReportContentEntity]),
    UsersModule
  ],
  controllers: [ReportCumulativeController, ReportContentController],
  providers: [ReportCumulativeService, ReportContentService],
  exports: [ReportCumulativeService, ReportContentService]
})
export class ReportCumulativeModule { }
