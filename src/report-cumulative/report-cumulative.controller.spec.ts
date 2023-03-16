import { Test, TestingModule } from '@nestjs/testing';
import { ReportCumulativeController } from './report-cumulative.controller';
import { ReportCumulativeService } from './report-cumulative.service';

describe('ReportCumulativeController', () => {
  let controller: ReportCumulativeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportCumulativeController],
      providers: [ReportCumulativeService],
    }).compile();

    controller = module.get<ReportCumulativeController>(ReportCumulativeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
