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
import { AdminOrderController } from './admin-order.controller';
import { SettingsModule } from 'src/settings/settings.module';
import { EmailModule } from 'src/email/email.module';
import { ExcelService } from 'src/excel/excel.service';
import { MessageModule } from 'src/message/message.module';

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
    PushNotificationModule,
    SettingsModule,
    EmailModule,
    MessageModule
  ],
  controllers: [OrderController, AdminOrderController],
  providers: [OrderService, IamportService, ExcelService],
  exports: [OrderService],
})
export class OrderModule { }
