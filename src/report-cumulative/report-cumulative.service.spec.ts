import { Test, TestingModule } from '@nestjs/testing';
import { ReportCumulativeService } from './report-cumulative.service';

describe('ReportCumulativeService', () => {
  let service: ReportCumulativeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportCumulativeService],
    }).compile();

    service = module.get<ReportCumulativeService>(ReportCumulativeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
