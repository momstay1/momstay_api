import { Module } from '@nestjs/common';
import { ProductOptionService } from './product-option.service';
import { ProductOptionController } from './product-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOptionEntity } from './entities/product-option.entity';
import { ProductModule } from 'src/product/product.module';
import { FileModule } from 'src/file/file.module';
import { ProductInfoModule } from 'src/product-info/product-info.module';
import { ExcelService } from 'src/excel/excel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductOptionEntity]),
    FileModule,
    ProductModule,
    ProductInfoModule
  ],
  controllers: [ProductOptionController],
  providers: [ProductOptionService, ExcelService],
  exports: [ProductOptionService]
})
export class ProductOptionModule { }
