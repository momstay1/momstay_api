import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingEntity } from './entities/setting.entity';
import { CommonService } from 'src/common/common.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SettingEntity]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService, CommonService],
  exports: [SettingsService]
})
export class SettingsModule { }
