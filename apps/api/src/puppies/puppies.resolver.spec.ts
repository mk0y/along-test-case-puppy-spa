import { Test, TestingModule } from '@nestjs/testing';
import { PuppiesResolver } from './puppies.resolver';
import { PuppiesService } from './puppies.service';

describe('PuppiesResolver', () => {
  let resolver: PuppiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuppiesResolver, PuppiesService],
    }).compile();

    resolver = module.get<PuppiesResolver>(PuppiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
