import { Query, Resolver } from 'type-graphql';
import { ProductDto } from '../dtos/Product.dto';
import { prismaClient } from '../../../../data/prismaClient';
import { ProductsPaginatedResponseDto } from '../dtos/ProductsPaginatedResponse.dto';
import { BadRequest, OK } from '../../../../utils/buildApiResponse';

@Resolver(ProductDto)
export default class GetProductsResolver {
  @Query(() => ProductsPaginatedResponseDto)
  async getProducts() {
    try {
      const response = await prismaClient.product.findMany();

      return OK(response);
    } catch (error: any) {
      return BadRequest(error.message);
    }
  }
}
