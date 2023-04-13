import { Query, Resolver } from 'type-graphql';
import { BadRequest, OK } from '../../../../utils/buildApiResponse';
import { CategoryDto } from '../dtos/CategoryDto';
import { CategoriesPaginatedResponseDto } from '../dtos/CategoriesPaginatedResponseDto';
import { GetCategoriesServiceFactory } from '../factories/GetCategoriesServiceFactory';

@Resolver(CategoryDto)
export default class GetCategoriesResolver {
  @Query(() => CategoriesPaginatedResponseDto)
  async getCategories() {
    try {
      const getCategoriesService = new GetCategoriesServiceFactory().make();

      return OK(await getCategoriesService.execute());
    } catch (error: any) {
      return BadRequest(error.message);
    }
  }
}
