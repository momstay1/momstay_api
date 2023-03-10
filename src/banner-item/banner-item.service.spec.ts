import { Test, TestingModule } from '@nestjs/testing';
import { BannerItemService } from './banner-item.service';

describe('BannerItemService', () => {
  let service: BannerItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BannerItemService],
    }).compile();

    service = module.get<BannerItemService>(BannerItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
