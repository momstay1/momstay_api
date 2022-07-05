import { Test, TestingModule } from '@nestjs/testing';
import { BoardContentsService } from './board-contents.service';

describe('BoardContentsService', () => {
  let service: BoardContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardContentsService],
    }).compile();

    service = module.get<BoardContentsService>(BoardContentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
