import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewEntity } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/users/users.module';
import { FileModule } from 'src/file/file.module';
import { AdminReviewsController } from './admin-reviews.controller';
import { ExcelService } from 'src/excel/excel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity]),
    ProductModule,
    UsersModule,
    FileModule,
  ],
  controllers: [ReviewsController, AdminReviewsController],
  providers: [ReviewsService, ExcelService],
  exports: [ReviewsService],
})
export class ReviewsModule { }
