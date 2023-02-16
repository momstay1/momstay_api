import { Module } from '@nestjs/common';
import { OrderTotalService } from './order-total.service';
import { OrderTotalController } from './order-total.controller';

@Module({
  controllers: [OrderTotalController],
  providers: [OrderTotalService]
})
export class OrderTotalModule {}
