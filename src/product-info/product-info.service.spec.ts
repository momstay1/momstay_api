import { Test, TestingModule } from '@nestjs/testing';
import { ProductInfoService } from './product-info.service';

describe('ProductInfoService', () => {
  let service: ProductInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductInfoService],
    }).compile();

    service = module.get<ProductInfoService>(ProductInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
