import { CreatePuppyInput } from './create-puppy.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePuppyInput extends PartialType(CreatePuppyInput) {
  @Field(() => Int)
  id: number;
}
