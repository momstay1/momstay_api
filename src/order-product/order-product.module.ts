import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductController } from './order-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderProductEntity]),
    FileModule,
  ],
  controllers: [OrderProductController],
  providers: [OrderProductService],
  exports: [OrderProductService]
})
export class OrderProductModule { }
