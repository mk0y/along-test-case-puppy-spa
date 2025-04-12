import { CreateWaitingListEntryInput } from './create-waiting-list-entry.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWaitingListEntryInput extends PartialType(CreateWaitingListEntryInput) {
  @Field(() => Int)
  id: number;
}
