import { describe, expect, it } from 'vitest';
import { GetProductsService } from '../../../../../src/graphql/schema/products/services/GetProductsService';
import { ProductsRepositoryInMemory } from '../../../../repositories/ProductsRepositoryInMemory';

describe('Get products service', () => {
  it('Should execute', async () => {
    const productsRepository = new ProductsRepositoryInMemory();
    const mocks = productsRepository.mockCreateMany();

    const sut = new GetProductsService(productsRepository);
    const products = await sut.execute();

    expect(products).toHaveLength(mocks.length);
  });
});
