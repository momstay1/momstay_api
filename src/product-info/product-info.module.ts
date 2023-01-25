import { Module } from '@nestjs/common';
import { ProductInfoService } from './product-info.service';
import { ProductInfoController } from './product-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInfoEntity } from './entities/product-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductInfoEntity]),
  ],
  controllers: [ProductInfoController],
  providers: [ProductInfoService],
  exports: [ProductInfoService]
})
export class ProductInfoModule { }
