import { Field, InputType } from 'type-graphql';

@InputType('CreateOrderInput')
export class CreateOrderDataDto {
  @Field()
  receivedAmount: number;

  @Field()
  exchange: number;

  @Field()
  productId: string;

  @Field()
  extrasIds: string[];
}
