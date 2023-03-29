import { Module } from '@nestjs/common';
import { PopupService } from './popup.service';
import { PopupController } from './popup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PopupEntity } from './entities/popup.entity';
import { FileModule } from 'src/file/file.module';
import { AdminPopupController } from './admin-popup.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PopupEntity]),
    FileModule
  ],
  controllers: [PopupController, AdminPopupController],
  providers: [PopupService],
})
export class PopupModule {}
