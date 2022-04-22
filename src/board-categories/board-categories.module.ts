import { Module } from '@nestjs/common';
import { BoardCategoriesService } from './board-categories.service';
import { BoardCategoriesController } from './board-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardCategoriesEntity } from './entities/board-categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardCategoriesEntity]),],
  controllers: [BoardCategoriesController],
  providers: [BoardCategoriesService],
  exports: [BoardCategoriesService]
})
export class BoardCategoriesModule { }
