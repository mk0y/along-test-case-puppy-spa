import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WaitingListService } from './waiting-list.service';
import { WaitingList } from './entities/waiting-list.entity';
import { CreateWaitingListInput } from './dto/create-waiting-list.input';

@Resolver(() => WaitingList)
export class WaitingListResolver {
  constructor(private readonly waitingListService: WaitingListService) { }

  @Mutation(() => WaitingList)
  createWaitingList(
    @Args('input') input: CreateWaitingListInput,
  ): Promise<WaitingList> {
    return this.waitingListService.create(input);
  }

  @Mutation(() => [WaitingList])
  createWaitingLists(
    @Args('input', { type: () => [CreateWaitingListInput] }) input: CreateWaitingListInput[],
  ): Promise<WaitingList[]> {
    return this.waitingListService.createWaitingLists(input);
  }

  @Query(() => [WaitingList])
  getWaitingLists(): Promise<WaitingList[]> {
    return this.waitingListService.findAll();
  }
}

