import { InputType, Field } from '@nestjs/graphql';
import { CreatePuppyInput } from '../../puppies/dto/create-puppy.input';

@InputType()
export class CreateWaitingListInput {
  @Field()
  date: string;
}

