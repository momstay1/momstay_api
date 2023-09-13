import { Module } from '@nestjs/common';
import { OrderTotalService } from './order-total.service';
import { OrderTotalController } from './order-total.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTotalEntity } from './entities/order-total.entity';
import { AdminOrderTotalController } from './admin-order-total.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderTotalEntity]),
  ],
  controllers: [OrderTotalController, AdminOrderTotalController],
  providers: [OrderTotalService],
  exports: [OrderTotalService]
})
export class OrderTotalModule { }
