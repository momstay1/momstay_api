import { Test, TestingModule } from '@nestjs/testing';
import { UserDormantService } from './user-dormant.service';

describe('UserDormantService', () => {
  let service: UserDormantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDormantService],
    }).compile();

    service = module.get<UserDormantService>(UserDormantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
