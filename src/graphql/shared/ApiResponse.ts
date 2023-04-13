import { ClassType, Field, ObjectType } from 'type-graphql';
import { IApiResponse } from '../../contracts/IApiResponse';

export function ApiResponse<TData>(TItemClass: ClassType<TData>) {
  @ObjectType({ isAbstract: true })
  abstract class ApiResponseClass implements IApiResponse<TData> {
    @Field(() => TItemClass, { nullable: true })
    data: TData | null;

    @Field(() => String, { nullable: true })
    error: string | null;

    @Field()
    isError: boolean;

    @Field()
    isSuccess: boolean;
  }

  return ApiResponseClass;
}
