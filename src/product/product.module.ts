import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { ProductInfoModule } from 'src/product-info/product-info.module';
import { UsersModule } from 'src/users/users.module';
import { AdminProductController } from './admin-product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    FileModule,
    ProductInfoModule,
    UsersModule,
  ],
  controllers: [ProductController, AdminProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule { }
