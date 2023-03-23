import { Module } from '@nestjs/common';
import { PopupService } from './popup.service';
import { PopupController } from './popup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PopupEntity } from './entities/popup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PopupEntity])],
  controllers: [PopupController],
  providers: [PopupService]
})
export class PopupModule {}
