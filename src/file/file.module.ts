import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { DefectModule } from 'src/defect/defect.module';

@Module({
  imports: [
    forwardRef(() => DefectModule),
    TypeOrmModule.forFeature([FileEntity]),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule { }
