import { Test, TestingModule } from '@nestjs/testing';
import { BoardCategoriesService } from './board-categories.service';

describe('BoardCategoriesService', () => {
  let service: BoardCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardCategoriesService],
    }).compile();

    service = module.get<BoardCategoriesService>(BoardCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
