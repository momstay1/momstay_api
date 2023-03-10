import { Test, TestingModule } from '@nestjs/testing';
import { BannerItemController } from './banner-item.controller';
import { BannerItemService } from './banner-item.service';

describe('BannerItemController', () => {
  let controller: BannerItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannerItemController],
      providers: [BannerItemService],
    }).compile();

    controller = module.get<BannerItemController>(BannerItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
