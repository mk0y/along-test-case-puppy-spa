import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWaitingListInput {
  @Field()
  date: string;
}
