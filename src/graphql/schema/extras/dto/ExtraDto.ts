import { Field, ObjectType } from 'type-graphql';

@ObjectType('Extra')
export class ExtraDto {
  @Field()
  extraId: string;

  @Field()
  name: string;

  @Field()
  price: number;
}
