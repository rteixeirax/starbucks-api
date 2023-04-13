import { Arg, Mutation, Resolver } from 'type-graphql';
import { ProductDto } from '../dtos/ProductDto';
import { CreateProductDataDto } from '../dtos/CreateProductDataDto';
import { BadRequest, OK } from '../../../../utils/buildApiResponse';
import { ProductResponseDto } from '../dtos/ProductResponseDto';
import { CreateProductServiceFactory } from '../factories/CreateProductServiceFactory';

@Resolver(ProductDto)
export default class CreateProductResolver {
  @Mutation(() => ProductResponseDto)
  async createProduct(@Arg('data') data: CreateProductDataDto) {
    try {
      const createProductService = new CreateProductServiceFactory().make();

      return OK(await createProductService.execute(data));
    } catch (error: any) {
      return BadRequest(error.message);
    }
  }
}
