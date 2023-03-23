import { Module } from '@nestjs/common';
import { PopupService } from './popup.service';
import { PopupController } from './popup.controller';

@Module({
  controllers: [PopupController],
  providers: [PopupService]
})
export class PopupModule {}
