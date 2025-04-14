import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { PuppiesService } from './puppies.service';
import { Puppy } from './entities/puppy.entity';
import { CreatePuppyInput } from './dto/create-puppy.input';

@Resolver(() => Puppy)
export class PuppiesResolver {
  constructor(private readonly puppiesService: PuppiesService) {}

  @Query(() => [Puppy])
  puppies(): Promise<Puppy[]> {
    return this.puppiesService.findAll();
  }

  @Mutation(() => Puppy)
  createPuppy(@Args('input') input: CreatePuppyInput): Promise<Puppy> {
    return this.puppiesService.create(input);
  }

  @Mutation(() => [Puppy])
  createPuppies(
    @Args('input', { type: () => [CreatePuppyInput] })
    input: CreatePuppyInput[],
  ): Promise<Puppy[]> {
    return this.puppiesService.createPuppies(input);
  }

  @Mutation(() => Puppy)
  markPuppyAsServiced(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Puppy> {
    return this.puppiesService.markAsServiced(id);
  }
}
