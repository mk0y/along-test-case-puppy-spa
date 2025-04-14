import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WaitingListService } from './waiting-list.service';
import { WaitingList } from './entities/waiting-list.entity';
import { CreateWaitingListInput } from './dto/create-waiting-list.input';

@Resolver(() => WaitingList)
export class WaitingListResolver {
  constructor(private readonly waitingListService: WaitingListService) {}

  @Query(() => [WaitingList])
  waitingLists(): Promise<WaitingList[]> {
    return this.waitingListService.findAll();
  }

  @Mutation(() => WaitingList)
  createWaitingList(
    @Args('input') input: CreateWaitingListInput,
  ): Promise<WaitingList> {
    return this.waitingListService.create(input);
  }

  @Mutation(() => [WaitingList])
  createWaitingLists(
    @Args('input', { type: () => [CreateWaitingListInput] })
    input: CreateWaitingListInput[],
  ): Promise<WaitingList[]> {
    return this.waitingListService.createWaitingLists(input);
  }

  // @Mutation(() => WaitingList)
  // addEntry(

  @Query(() => [WaitingList])
  getWaitingLists(): Promise<WaitingList[]> {
    return this.waitingListService.findAll();
  }

  @Query(() => WaitingList)
  getByDate(@Args('date') date: string): Promise<WaitingList> {
    return this.waitingListService.findByDate(date);
  }
}
