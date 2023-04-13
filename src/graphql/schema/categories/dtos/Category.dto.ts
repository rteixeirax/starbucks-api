import { Field, ObjectType } from 'type-graphql';

@ObjectType('Category')
export class CategoryDto {
  @Field()
  categoryId: string;

  @Field()
  name: string;
}
