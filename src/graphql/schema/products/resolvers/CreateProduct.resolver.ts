import { Arg, Mutation, Resolver } from 'type-graphql';
import { ProductDto } from '../dtos/Product.dto';
import { CreateProductDataDto } from '../dtos/CreateProductData.dto';
import { prismaClient } from '../../../../data/prismaClient';
import { BadRequest, OK } from '../../../../utils/buildApiResponse';
import { ProductResponseDto } from '../dtos/ProductResponse.dto';
import { ValidationException } from '../../../../exceptions/ValidationException';

@Resolver(ProductDto)
export default class CreateProductResolver {
  @Mutation(() => ProductResponseDto)
  async createProduct(@Arg('data') data: CreateProductDataDto) {
    try {
      const category = await prismaClient.category.findFirst({
        where: { categoryId: data.categoryId },
      });

      if (!category) {
        throw new ValidationException('Invalid categoryId');
      }

      const newProduct = await prismaClient.product.create({ data });

      return OK(newProduct);
    } catch (error: any) {
      return BadRequest(error.message);
    }
  }
}
