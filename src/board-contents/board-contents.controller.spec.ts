import { Test, TestingModule } from '@nestjs/testing';
import { BoardContentsController } from './board-contents.controller';
import { BoardContentsService } from './board-contents.service';

describe('BoardContentsController', () => {
  let controller: BoardContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardContentsController],
      providers: [BoardContentsService],
    }).compile();

    controller = module.get<BoardContentsController>(BoardContentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
