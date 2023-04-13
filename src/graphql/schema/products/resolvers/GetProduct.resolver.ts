import { Arg, Query, Resolver } from 'type-graphql';
import { ProductDto } from '../dtos/Product.dto';
import { prismaClient } from '../../../../data/prismaClient';
import { ProductResponseDto } from '../dtos/ProductResponse.dto';
import { BadRequest, OK } from '../../../../utils/buildApiResponse';
import { ValidationException } from '../../../../exceptions/ValidationException';

@Resolver(ProductDto)
export default class GetProductResolver {
  @Query(() => ProductResponseDto)
  async getProduct(@Arg('productId') productId: string) {
    try {
      const response = await prismaClient.product.findFirst({
        where: { productId },
      });

      if (!response) {
        throw new ValidationException('Invalid productId');
      }

      return OK(response);
    } catch (error: any) {
      return BadRequest(error.message);
    }
  }
}
