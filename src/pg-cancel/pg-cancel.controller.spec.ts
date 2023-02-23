import { Test, TestingModule } from '@nestjs/testing';
import { PgCancelController } from './pg-cancel.controller';
import { PgCancelService } from './pg-cancel.service';

describe('PgCancelController', () => {
  let controller: PgCancelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PgCancelController],
      providers: [PgCancelService],
    }).compile();

    controller = module.get<PgCancelController>(PgCancelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
