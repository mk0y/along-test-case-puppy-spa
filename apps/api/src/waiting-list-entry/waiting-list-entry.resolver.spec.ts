import { Test, TestingModule } from '@nestjs/testing';
import { WaitingListEntryResolver } from './waiting-list-entry.resolver';
import { WaitingListEntryService } from './waiting-list-entry.service';

describe('WaitingListEntryResolver', () => {
  let resolver: WaitingListEntryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitingListEntryResolver, WaitingListEntryService],
    }).compile();

    resolver = module.get<WaitingListEntryResolver>(WaitingListEntryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
