import { Field, InputType } from 'type-graphql';

@InputType('CreateCategoryInput')
export class CreateCategoryDataDto {
  @Field()
  name: string;
}
