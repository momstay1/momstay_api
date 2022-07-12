import { Test, TestingModule } from '@nestjs/testing';
import { DefectPlaceController } from './defect-place.controller';
import { DefectPlaceService } from './defect-place.service';

describe('DefectPlaceController', () => {
  let controller: DefectPlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefectPlaceController],
      providers: [DefectPlaceService],
    }).compile();

    controller = module.get<DefectPlaceController>(DefectPlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
