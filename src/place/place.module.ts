import { forwardRef, Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceEntity } from './entities/place.entity';
import { CommonService } from 'src/common/common.service';
import { DefectModule } from 'src/defect/defect.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceEntity]),
    forwardRef(() => DefectModule),
  ],
  controllers: [PlaceController],
  providers: [PlaceService, CommonService],
  exports: [PlaceService],
})
export class PlaceModule { }
