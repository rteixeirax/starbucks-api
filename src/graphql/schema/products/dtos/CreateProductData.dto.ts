import { Field, InputType } from 'type-graphql';

@InputType('CreateProductInput')
export class CreateProductDataDto {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  stock: number;

  @Field()
  categoryId: string;
}
