import { Test, TestingModule } from '@nestjs/testing';
import { BoardCategoriesController } from './board-categories.controller';
import { BoardCategoriesService } from './board-categories.service';

describe('BoardCategoriesController', () => {
  let controller: BoardCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardCategoriesController],
      providers: [BoardCategoriesService],
    }).compile();

    controller = module.get<BoardCategoriesController>(BoardCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
