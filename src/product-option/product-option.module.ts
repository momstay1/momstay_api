import { Module } from '@nestjs/common';
import { ProductOptionService } from './product-option.service';
import { ProductOptionController } from './product-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOptionEntity } from './entities/product-option.entity';
import { ProductModule } from 'src/product/product.module';
import { FileModule } from 'src/file/file.module';
import { ProductInfoModule } from 'src/product-info/product-info.module';
import { ExcelService } from 'src/excel/excel.service';
import { UsersModule } from 'src/users/users.module';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductOptionEntity]),
    FileModule,
    ProductModule,
    ProductInfoModule,
    UsersModule,
    SettingsModule
  ],
  controllers: [ProductOptionController],
  providers: [ProductOptionService, ExcelService],
  exports: [ProductOptionService]
})
export class ProductOptionModule { }
