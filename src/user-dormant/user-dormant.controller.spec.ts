import { Test, TestingModule } from '@nestjs/testing';
import { UserDormantController } from './user-dormant.controller';
import { UserDormantService } from './user-dormant.service';

describe('UserDormantController', () => {
  let controller: UserDormantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDormantController],
      providers: [UserDormantService],
    }).compile();

    controller = module.get<UserDormantController>(UserDormantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
