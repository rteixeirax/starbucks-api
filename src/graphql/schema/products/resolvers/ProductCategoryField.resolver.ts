import { FieldResolver, Resolver, Root } from 'type-graphql';
import { ProductDto } from '../dtos/Product.dto';
import { prismaClient } from '../../../../data/prismaClient';
import { CategoryDto } from '../../categories/dtos/Category.dto';

@Resolver(ProductDto)
export default class ProductCategoryFieldResolver {
  @FieldResolver(() => CategoryDto)
  async category(@Root() product: ProductDto) {
    const category = await prismaClient.category.findFirst({
      where: { categoryId: product.categoryId },
    });

    return category || null;
  }
}
