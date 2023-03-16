import { forwardRef, Module } from '@nestjs/common';
import { BannerItemService } from './banner-item.service';
import { BannerItemController } from './banner-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerItemEntity } from './entities/banner-item.entity';
import { FileModule } from 'src/file/file.module';
import { BannerModule } from 'src/banner/banner.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BannerItemEntity]),
    forwardRef(() => BannerModule),
    FileModule,
  ],
  controllers: [BannerItemController],
  providers: [BannerItemService],
  exports: [BannerItemService]
})
export class BannerItemModule { }
