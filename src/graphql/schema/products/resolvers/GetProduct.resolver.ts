import { Arg, Query, Resolver } from 'type-graphql';
import { ProductDto } from '../dtos/ProductDto';
import { ProductResponseDto } from '../dtos/ProductResponseDto';
import { BadRequest, OK } from '../../../../utils/buildApiResponse';
import { GetProductServiceFactory } from '../factories/GetProductServiceFactory';

@Resolver(ProductDto)
export default class GetProductResolver {
  @Query(() => ProductResponseDto)
  async getProduct(@Arg('productId') productId: string) {
    try {
      const getProductService = new GetProductServiceFactory().make();

      return OK(await getProductService.execute({ productId }));
    } catch (error: any) {
      return BadRequest(error.message);
    }
  }
}
