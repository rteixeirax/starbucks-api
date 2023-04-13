import { FieldResolver, Resolver, Root } from 'type-graphql';
import { ProductDto } from '../dtos/ProductDto';
import { CategoryDto } from '../../categories/dtos/CategoryDto';
import { GetCategoryServiceFactory } from '../../categories/factories/GetCategoryServiceFactory';

@Resolver(ProductDto)
export default class ProductCategoryFieldResolver {
  @FieldResolver(() => CategoryDto)
  async category(@Root() product: ProductDto) {
    const categoriesRepository = new GetCategoryServiceFactory().make();

    return categoriesRepository.execute({ categoryId: product.categoryId });
  }
}
