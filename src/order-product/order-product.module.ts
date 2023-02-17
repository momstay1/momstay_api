import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductController } from './order-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductEntity } from './entities/order-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderProductEntity]),
  ],
  controllers: [OrderProductController],
  providers: [OrderProductService]
})
export class OrderProductModule { }
