import { beforeEach, describe, expect, it } from 'vitest';
import { CreateProductService } from '../../../../../src/graphql/schema/products/services/CreateProductService';
import { ProductsRepositoryInMemory } from '../../../../repositories/ProductsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '../../../../repositories/CategoriesRepositoryInMemory';

describe('Create product service', () => {
  let productsRepository: ProductsRepositoryInMemory;
  let categoryRepository: CategoriesRepositoryInMemory;
  let sut: CreateProductService;

  beforeEach(() => {
    productsRepository = new ProductsRepositoryInMemory();
    categoryRepository = new CategoriesRepositoryInMemory();
    sut = new CreateProductService(productsRepository, categoryRepository);
  });

  it('Should execute', async () => {
    const mockCategory = categoryRepository.mockCreate();
    const mockProduct = productsRepository.mockCreate({ categoryId: mockCategory.categoryId });

    const product = await sut.execute(mockProduct);

    expect(product).not.toBeNull();
    expect(product?.productId).toBeDefined();
    expect(product.categoryId).toStrictEqual(mockProduct.categoryId);
    expect(product.name).toStrictEqual(mockProduct.name);
    expect(product.stock).toStrictEqual(mockProduct.stock);
    expect(product.price).toStrictEqual(mockProduct.price);
  });

  it('Should throw validation error with invalid categoryId', async () => {
    const mockProduct = productsRepository.mockCreate();

    expect(async () => {
      await sut.execute(mockProduct);
    }).rejects.toThrowError('Invalid categoryId');
  });
});
