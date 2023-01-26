import { Test, TestingModule } from '@nestjs/testing';
import { MetroController } from './metro.controller';
import { MetroService } from './metro.service';

describe('MetroController', () => {
  let controller: MetroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetroController],
      providers: [MetroService],
    }).compile();

    controller = module.get<MetroController>(MetroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
