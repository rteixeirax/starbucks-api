import { describe, expect, it } from 'vitest';
import { CreateProductService } from '../../../../../src/graphql/schema/products/services/CreateProductService';
import { ProductsRepositoryInMemory } from '../../../../repositories/ProductsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '../../../../repositories/CategoriesRepositoryInMemory';
import { ValidationException } from '../../../../../src/exceptions/ValidationException';

describe('Create product service', () => {
  it('Should execute', async () => {
    const productsRepository = new ProductsRepositoryInMemory();
    const categoryRepository = new CategoriesRepositoryInMemory();

    const mockCategory = categoryRepository.mockCreate();
    const mockProduct = productsRepository.mockCreate({ categoryId: mockCategory.categoryId });

    const sut = new CreateProductService(productsRepository, categoryRepository);
    const product = await sut.execute(mockProduct);

    expect(product).not.toBeNull();
    expect(product?.productId).toBeDefined();
    expect(product.categoryId).toStrictEqual(mockProduct.categoryId);
    expect(product.name).toStrictEqual(mockProduct.name);
    expect(product.stock).toStrictEqual(mockProduct.stock);
    expect(product.price).toStrictEqual(mockProduct.price);
  });

  it('Should throw validation error with invalid categoryId', async () => {
    const productsRepository = new ProductsRepositoryInMemory();
    const categoryRepository = new CategoriesRepositoryInMemory();

    categoryRepository.mockCreateMany();
    const mockProduct = productsRepository.mockCreate();

    const sut = new CreateProductService(productsRepository, categoryRepository);

    expect(async () => {
      await sut.execute(mockProduct);
    }).rejects.toThrow(ValidationException);
  });
});
