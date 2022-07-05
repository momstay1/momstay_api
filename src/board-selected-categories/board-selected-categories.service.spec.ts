import { Test, TestingModule } from '@nestjs/testing';
import { BoardSelectedCategoriesService } from './board-selected-categories.service';

describe('BoardSelectedCategoriesService', () => {
  let service: BoardSelectedCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardSelectedCategoriesService],
    }).compile();

    service = module.get<BoardSelectedCategoriesService>(BoardSelectedCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
