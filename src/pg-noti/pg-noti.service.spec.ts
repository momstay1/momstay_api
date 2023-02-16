import { Test, TestingModule } from '@nestjs/testing';
import { PgNotiService } from './pg-noti.service';

describe('PgNotiService', () => {
  let service: PgNotiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgNotiService],
    }).compile();

    service = module.get<PgNotiService>(PgNotiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
