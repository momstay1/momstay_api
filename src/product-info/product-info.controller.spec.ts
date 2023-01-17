import { Test, TestingModule } from '@nestjs/testing';
import { ProductInfoController } from './product-info.controller';
import { ProductInfoService } from './product-info.service';

describe('ProductInfoController', () => {
  let controller: ProductInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductInfoController],
      providers: [ProductInfoService],
    }).compile();

    controller = module.get<ProductInfoController>(ProductInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
