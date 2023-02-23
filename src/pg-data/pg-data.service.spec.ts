import { Test, TestingModule } from '@nestjs/testing';
import { PgDataService } from './pg-data.service';

describe('PgDataService', () => {
  let service: PgDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgDataService],
    }).compile();

    service = module.get<PgDataService>(PgDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
