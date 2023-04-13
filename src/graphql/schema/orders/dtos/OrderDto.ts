import { Field, ObjectType } from 'type-graphql';
import { ExtraDto } from '../../extras/dto/ExtraDto';

@ObjectType('Order')
export class OrderDto {
  @Field()
  orderId: string;

  @Field()
  receivedAmount: number;

  @Field()
  exchange: number;

  @Field()
  productId: string;

  @Field()
  extras?: ExtraDto[];
}
