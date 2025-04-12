import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePuppyInput {
  @Field()
  ownerName: string;

  @Field()
  puppyName: string;

  @Field()
  serviceRequested: string;

  @Field()
  arrivalTime: string;
}

