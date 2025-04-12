import { CreateWaitingListInput } from './create-waiting-list.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWaitingListInput extends PartialType(CreateWaitingListInput) {
  @Field(() => Int)
  id: number;
}
