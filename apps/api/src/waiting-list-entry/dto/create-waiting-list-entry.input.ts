import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWaitingListEntryInput {
  @Field()
  position: number;

  @Field()
  createdAt: string;
}
