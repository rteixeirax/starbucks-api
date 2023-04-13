import { Field, InputType } from 'type-graphql';

@InputType('CreateOrderInput')
export class CreateOrderDataDto {
  @Field()
  receivedAmount: number;

  @Field({ nullable: true })
  exchange?: number;

  @Field({ nullable: true })
  total?: number;

  @Field()
  productId: string;

  @Field(() => [String], { nullable: true })
  extrasIds?: string[];
}
