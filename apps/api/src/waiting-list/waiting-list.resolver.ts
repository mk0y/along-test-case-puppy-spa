import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WaitingListService } from './waiting-list.service';
import { WaitingList } from './entities/waiting-list.entity';
import { CreateWaitingListInput } from './dto/create-waiting-list.input';
import { GraphQLError } from 'graphql';

@Resolver(() => WaitingList)
export class WaitingListResolver {
  constructor(private readonly waitingListService: WaitingListService) {}

  @Query(() => [WaitingList])
  async waitingLists(): Promise<WaitingList[]> {
    return this.waitingListService.findAll();
  }

  @Mutation(() => WaitingList)
  async createWaitingList(
    @Args('input') input: CreateWaitingListInput,
  ): Promise<WaitingList> {
    try {
      const createdList = await this.waitingListService.create(input);
      return createdList;
    } catch (error: unknown) {
      throw new GraphQLError((error as Error).message);
    }
  }

  @Mutation(() => [WaitingList])
  createWaitingLists(
    @Args('input', { type: () => [CreateWaitingListInput] })
    input: CreateWaitingListInput[],
  ): Promise<WaitingList[]> {
    return this.waitingListService.createWaitingLists(input);
  }

  @Query(() => [WaitingList])
  async getWaitingLists(): Promise<WaitingList[]> {
    return this.waitingListService.findAll();
  }

  @Query(() => WaitingList)
  async getByDate(@Args('date') date: string): Promise<WaitingList> {
    return this.waitingListService.findByDate(date);
  }
}
