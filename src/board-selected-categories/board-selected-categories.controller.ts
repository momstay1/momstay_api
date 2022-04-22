import { Controller } from '@nestjs/common';
import { BoardSelectedCategoriesService } from './board-selected-categories.service';

@Controller('board-selected-categories')
export class BoardSelectedCategoriesController {
  constructor(private readonly boardSelectedCategoriesService: BoardSelectedCategoriesService) {}
}
