import { Field, ObjectType } from 'type-graphql';
import { CategoryDto } from '../../categories/dtos/CategoryDto';

@ObjectType('Product')
export class ProductDto {
  @Field()
  productId: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  stock: number;

  @Field()
  categoryId: string;

  @Field()
  category?: CategoryDto;
}
