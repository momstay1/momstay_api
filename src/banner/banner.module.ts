import { forwardRef, Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerEntity } from './entities/banner.entity';
import { FileModule } from 'src/file/file.module';
import { BannerItemModule } from 'src/banner-item/banner-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BannerEntity]),
    FileModule,
    forwardRef(() => BannerItemModule),
  ],
  controllers: [BannerController],
  providers: [BannerService],
  exports: [BannerService]
})
export class BannerModule { }
