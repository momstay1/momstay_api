import { Module } from '@nestjs/common';
import { DefectPlaceService } from './defect-place.service';
import { DefectPlaceController } from './defect-place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefectPlaceEntity } from './entities/defect-place.entity';
import { PlaceModule } from 'src/place/place.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DefectPlaceEntity]),
    PlaceModule
  ],
  controllers: [DefectPlaceController],
  providers: [DefectPlaceService]
})
export class DefectPlaceModule { }
