import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerEntity } from './entities/banner.entity';
import { BannerItemEntity } from './entities/banner-item.entity';
import { BannerItemController } from './banner-item.controller';
import { BannerItemService } from './banner-item.service';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BannerEntity, BannerItemEntity]),
    FileModule
  ],
  controllers: [BannerController, BannerItemController],
  providers: [BannerService, BannerItemService],
  exports: [BannerService, BannerItemService]
})
export class BannerModule { }
