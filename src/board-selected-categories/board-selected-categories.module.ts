import { Module } from '@nestjs/common';
import { BoardSelectedCategoriesService } from './board-selected-categories.service';
import { BoardSelectedCategoriesController } from './board-selected-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardSelectedCategoriesEntity } from './entities/board-selected-categories.entity';
import { BoardCategoriesModule } from 'src/board-categories/board-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardSelectedCategoriesEntity]),
    BoardCategoriesModule,
  ],
  controllers: [BoardSelectedCategoriesController],
  providers: [BoardSelectedCategoriesService],
  exports: [BoardSelectedCategoriesService],
})
export class BoardSelectedCategoriesModule { }
