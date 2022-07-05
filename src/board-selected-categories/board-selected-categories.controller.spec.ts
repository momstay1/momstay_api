import { Test, TestingModule } from '@nestjs/testing';
import { BoardSelectedCategoriesController } from './board-selected-categories.controller';
import { BoardSelectedCategoriesService } from './board-selected-categories.service';

describe('BoardSelectedCategoriesController', () => {
  let controller: BoardSelectedCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardSelectedCategoriesController],
      providers: [BoardSelectedCategoriesService],
    }).compile();

    controller = module.get<BoardSelectedCategoriesController>(BoardSelectedCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
