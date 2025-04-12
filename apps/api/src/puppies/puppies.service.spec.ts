import { Test, TestingModule } from '@nestjs/testing';
import { PuppiesService } from './puppies.service';

describe('PuppiesService', () => {
  let service: PuppiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuppiesService],
    }).compile();

    service = module.get<PuppiesService>(PuppiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
