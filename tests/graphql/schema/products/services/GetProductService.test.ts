import { describe, expect, it } from 'vitest';
import { GetProductService } from '../../../../../src/graphql/schema/products/services/GetProductService';
import { ProductsRepositoryInMemory } from '../../../../repositories/ProductsRepositoryInMemory';

describe('Get product service', () => {
  it('Should execute', async () => {
    const productsRepository = new ProductsRepositoryInMemory();
    const mocks = productsRepository.mockCreateMany();

    const sut = new GetProductService(productsRepository);
    const product = await sut.execute({ productId: mocks[0].productId });

    expect(product).not.toBeNull();
    expect(product?.productId).toStrictEqual(mocks[0].productId);
  });
});
