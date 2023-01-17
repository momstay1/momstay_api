import { Module } from '@nestjs/common';
import { ProductInfoService } from './product-info.service';
import { ProductInfoController } from './product-info.controller';

@Module({
  controllers: [ProductInfoController],
  providers: [ProductInfoService]
})
export class ProductInfoModule {}
