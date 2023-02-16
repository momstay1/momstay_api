import { Test, TestingModule } from '@nestjs/testing';
import { PgDataController } from './pg-data.controller';
import { PgDataService } from './pg-data.service';

describe('PgDataController', () => {
  let controller: PgDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PgDataController],
      providers: [PgDataService],
    }).compile();

    controller = module.get<PgDataController>(PgDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
