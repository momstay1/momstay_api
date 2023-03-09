import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ProductModule } from 'src/product/product.module';
import { ProductOptionModule } from 'src/product-option/product-option.module';
import { UsersModule } from 'src/users/users.module';
import { OrderProductModule } from 'src/order-product/order-product.module';
import { OrderTotalModule } from 'src/order-total/order-total.module';
import { IamportService } from 'src/iamport/iamport.service';
import { PgDataModule } from 'src/pg-data/pg-data.module';
import { PushNotificationModule } from 'src/push-notification/push-notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    ProductModule,
    UsersModule,
    ProductOptionModule,
    OrderProductModule,
    OrderTotalModule,
    PgDataModule,
    UsersModule,
    PushNotificationModule
  ],
  controllers: [OrderController],
  providers: [OrderService, IamportService],
  exports: [OrderService]
})
export class OrderModule { }
