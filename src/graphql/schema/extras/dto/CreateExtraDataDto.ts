import { Field, ObjectType } from 'type-graphql';

@ObjectType('CreateExtraInput')
export class CreateExtraDataDto {
  @Field()
  name: string;

  @Field()
  price: number;
}
