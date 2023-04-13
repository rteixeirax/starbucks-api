import crypto from 'node:crypto';
import { IProductsRepository } from '../../src/graphql/schema/products/repositories/IProductsRepository';
import { ProductDto } from '../../src/graphql/schema/products/dtos/ProductDto';
import { CreateProductDataDto } from '../../src/graphql/schema/products/dtos/CreateProductDataDto';

export class ProductsRepositoryInMemory implements IProductsRepository {
  products: ProductDto[] = [];

  async findAll(): Promise<ProductDto[]> {
    return this.products;
  }

  async findById(id: string): Promise<ProductDto | null> {
    return this.products.find((product) => product.productId === id) || null;
  }

  async save(data: CreateProductDataDto): Promise<ProductDto> {
    const newProduct = {
      productId: crypto.randomUUID(),
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  mockCreate(data?: Partial<ProductDto>) {
    const newData = {
      productId: data?.productId || crypto.randomUUID(),
      name: data?.name || 'fake product',
      price: data?.price ?? 10,
      stock: data?.stock ?? 100,
      categoryId: data?.categoryId || crypto.randomUUID(),
    };
    this.products.push(newData);
    return newData;
  }

  mockCreateMany(args?: { qty?: number; data?: Partial<ProductDto> }) {
    const { qty = 5, data } = args || {};

    const returnData: ProductDto[] = [];
    for (let i = 0; i < qty; i += 1) {
      returnData.push(this.mockCreate(data));
    }
    return returnData;
  }
}
