import { Module } from '@nestjs/common';
import { DefectService } from './defect.service';
import { DefectController } from './defect.controller';

@Module({
  controllers: [DefectController],
  providers: [DefectService]
})
export class DefectModule {}
