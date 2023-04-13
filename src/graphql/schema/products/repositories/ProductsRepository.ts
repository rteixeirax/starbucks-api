import { Product } from '@prisma/client';
import { ProductDto } from '../dtos/ProductDto';
import { prismaClient } from '../../../../data/prismaClient';
import { IProductsRepository } from './IProductsRepository';
import { CreateProductDataDto } from '../dtos/CreateProductDataDto';

export class ProductsRepository implements IProductsRepository {
  mapDbModelToDto(model: Product) {
    return {
      productId: model.productId,
      name: model.name,
      price: model.price as unknown as number,
      stock: model.stock,
      categoryId: model.categoryId,
    };
  }

  async findAll(ids?: string[]): Promise<ProductDto[]> {
    const products = ids
      ? await prismaClient.product.findMany({ where: { productId: { in: ids } } })
      : await prismaClient.product.findMany();
    return products.map((product) => this.mapDbModelToDto(product));
  }

  async findById(id: string): Promise<ProductDto | null> {
    const product = await prismaClient.product.findFirst({
      where: { productId: id },
    });
    return product ? this.mapDbModelToDto(product) : null;
  }

  async save(data: CreateProductDataDto): Promise<ProductDto> {
    const product = await prismaClient.product.create({
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
      },
    });

    return this.mapDbModelToDto(product);
  }
}
