import { Query, Resolver } from 'type-graphql';
import { ProductDto } from '../dtos/ProductDto';
import { ProductsPaginatedResponseDto } from '../dtos/ProductsPaginatedResponseDto';
import { BadRequest, OK } from '../../../../utils/buildApiResponse';
import { GetProductsServiceFactory } from '../factories/GetProductsServiceFactory';

@Resolver(ProductDto)
export default class GetProductsResolver {
  @Query(() => ProductsPaginatedResponseDto)
  async getProducts() {
    try {
      const getProductsService = new GetProductsServiceFactory().make();

      return OK(await getProductsService.execute());
    } catch (error: any) {
      return BadRequest(error.message);
    }
  }
}
