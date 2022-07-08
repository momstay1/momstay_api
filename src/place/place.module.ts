import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceEntity } from './entities/place.entity';
import { CommonService } from 'src/common/common.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceEntity]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService, CommonService],
  exports: [PlaceService],
})
export class PlaceModule { }
