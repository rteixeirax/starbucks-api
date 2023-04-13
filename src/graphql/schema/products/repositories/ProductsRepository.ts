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

  mapDtoToDbMode(dto: ProductDto | CreateProductDataDto) {
    return {
      name: dto.name,
      price: dto.price,
      stock: dto.stock,
      categoryId: dto.categoryId,
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
      data: this.mapDtoToDbMode(data),
    });

    return this.mapDbModelToDto(product);
  }

  async update(data: ProductDto): Promise<ProductDto> {
    const product = await prismaClient.product.update({
      where: { productId: data.productId },
      data: this.mapDtoToDbMode(data),
    });

    return this.mapDbModelToDto(product);
  }
}
