import { Test, TestingModule } from '@nestjs/testing';
import { WaitingListEntryService } from './waiting-list-entry.service';

describe('WaitingListEntryService', () => {
  let service: WaitingListEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitingListEntryService],
    }).compile();

    service = module.get<WaitingListEntryService>(WaitingListEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
