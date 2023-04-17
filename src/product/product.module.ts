import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { ProductInfoModule } from 'src/product-info/product-info.module';
import { UsersModule } from 'src/users/users.module';
import { AdminProductController } from './admin-product.controller';
import { MetroModule } from 'src/metro/metro.module';
import { CollegeModule } from 'src/college/college.module';
import { ExcelService } from 'src/excel/excel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    FileModule,
    ProductInfoModule,
    UsersModule,
    MetroModule,
    CollegeModule,
  ],
  controllers: [ProductController, AdminProductController],
  providers: [ProductService, ExcelService],
  exports: [ProductService]
})
export class ProductModule { }
