import { Test, TestingModule } from '@nestjs/testing';
import { OrderTotalService } from './order-total.service';

describe('OrderTotalService', () => {
  let service: OrderTotalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTotalService],
    }).compile();

    service = module.get<OrderTotalService>(OrderTotalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
