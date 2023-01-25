import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { ProductInfoModule } from 'src/product-info/product-info.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    FileModule,
    ProductInfoModule,
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
