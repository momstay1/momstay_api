import { Test, TestingModule } from '@nestjs/testing';
import { PgCancelService } from './pg-cancel.service';

describe('PgCancelService', () => {
  let service: PgCancelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgCancelService],
    }).compile();

    service = module.get<PgCancelService>(PgCancelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
