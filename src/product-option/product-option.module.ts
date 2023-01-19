import { Module } from '@nestjs/common';
import { ProductOptionService } from './product-option.service';
import { ProductOptionController } from './product-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOptionEntity } from './entities/product-option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductOptionEntity]),
  ],
  controllers: [ProductOptionController],
  providers: [ProductOptionService]
})
export class ProductOptionModule { }
