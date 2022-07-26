import { Module } from '@nestjs/common';
import { DefectService } from './defect.service';
import { DefectController } from './defect.controller';
import { CommonService } from 'src/common/common.service';
import { DefectEntity } from './entities/defect.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DefectEntity]),
  ],
  controllers: [DefectController],
  providers: [DefectService, CommonService],
  exports: [DefectService],
})
export class DefectModule { }
