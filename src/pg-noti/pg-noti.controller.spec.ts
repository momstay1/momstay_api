import { Test, TestingModule } from '@nestjs/testing';
import { PgNotiController } from './pg-noti.controller';
import { PgNotiService } from './pg-noti.service';

describe('PgNotiController', () => {
  let controller: PgNotiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PgNotiController],
      providers: [PgNotiService],
    }).compile();

    controller = module.get<PgNotiController>(PgNotiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
