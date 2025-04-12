import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WaitingListEntry } from './entities/waiting-list-entry.entity';
import { WaitingListEntryService } from './waiting-list-entry.service';

@Resolver(() => WaitingListEntry)
export class WaitingListEntryResolver {
  constructor(private readonly entryService: WaitingListEntryService) { }

  @Query(() => [WaitingListEntry])
  async waitingListEntries(): Promise<WaitingListEntry[]> {
    return this.entryService.findAll();
  }

  @Mutation(() => WaitingListEntry)
  async createWaitingListEntry(
    @Args('waitingListId', { type: () => Int }) waitingListId: number,
    @Args('position', { type: () => Int }) position: number,
    @Args('createdAt', { type: () => String }) createdAt: string,
  ): Promise<WaitingListEntry> {
    return this.entryService.create({
      position,
      createdAt,
    }, waitingListId);
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

