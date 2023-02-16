import { Test, TestingModule } from '@nestjs/testing';
import { OrderTotalController } from './order-total.controller';
import { OrderTotalService } from './order-total.service';

describe('OrderTotalController', () => {
  let controller: OrderTotalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderTotalController],
      providers: [OrderTotalService],
    }).compile();

    controller = module.get<OrderTotalController>(OrderTotalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
