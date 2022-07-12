import { Test, TestingModule } from '@nestjs/testing';
import { DefectPlaceService } from './defect-place.service';

describe('DefectPlaceService', () => {
  let service: DefectPlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefectPlaceService],
    }).compile();

    service = module.get<DefectPlaceService>(DefectPlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
