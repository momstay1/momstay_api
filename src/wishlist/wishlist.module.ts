import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistEntity } from './entities/wishlist.entity';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WishlistEntity]),
    UsersModule,
    ProductModule
  ],
  controllers: [WishlistController],
  providers: [WishlistService]
})
export class WishlistModule { }
