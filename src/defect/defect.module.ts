import { forwardRef, Module } from '@nestjs/common';
import { DefectService } from './defect.service';
import { DefectController } from './defect.controller';
import { CommonService } from 'src/common/common.service';
import { DefectEntity } from './entities/defect.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { FileModule } from 'src/file/file.module';
import { PlaceModule } from 'src/place/place.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DefectEntity]),
    UsersModule,
    FileModule,
    forwardRef(() => PlaceModule),
  ],
  controllers: [DefectController],
  providers: [DefectService, CommonService],
  exports: [DefectService],
})
export class DefectModule { }
