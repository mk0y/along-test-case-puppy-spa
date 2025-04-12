import { Test, TestingModule } from '@nestjs/testing';
import { WaitingListResolver } from './waiting-list.resolver';
import { WaitingListService } from './waiting-list.service';

describe('WaitingListResolver', () => {
  let resolver: WaitingListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitingListResolver, WaitingListService],
    }).compile();

    resolver = module.get<WaitingListResolver>(WaitingListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
