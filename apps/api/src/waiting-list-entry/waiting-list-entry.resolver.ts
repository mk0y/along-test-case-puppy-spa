import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WaitingListEntry } from './entities/waiting-list-entry.entity';
import { WaitingListEntryService } from './waiting-list-entry.service';
import { CreateWaitingListEntryInput } from './dto/create-waiting-list-entry.input';

@Resolver(() => WaitingListEntry)
export class WaitingListEntryResolver {
  constructor(private readonly entryService: WaitingListEntryService) {}

  @Query(() => [WaitingListEntry])
  async waitingListEntries(): Promise<WaitingListEntry[]> {
    return this.entryService.findAll();
  }

  @Query(() => [WaitingListEntry])
  async findByWaitingListId(
    @Args('waitingListId', { type: () => Int }) waitingListId: number,
  ): Promise<WaitingListEntry[]> {
    return this.entryService.findByWaitingListId(waitingListId);
  }

  @Mutation(() => WaitingListEntry)
  async createWaitingListEntry(
    @Args('input') input: CreateWaitingListEntryInput,
    @Args('waitingListId', { type: () => Int }) waitingListId: number,
  ): Promise<WaitingListEntry> {
    return this.entryService.create(input, waitingListId);
  }

  @Mutation(() => WaitingListEntry)
  async updateWaitingListEntryPosition(
    @Args('id', { type: () => Int }) id: number,
    @Args('position', { type: () => Int }) position: number,
  ): Promise<WaitingListEntry> {
    return this.entryService.updatePosition(id, position);
  }

  @Mutation(() => Boolean)
  async markWaitingListEntryAsServiced(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.entryService.markAsServiced(id);
    return true;
  }
}
