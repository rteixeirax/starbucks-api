import { describe, expect, it } from 'vitest';
import { CategoriesRepositoryInMemory } from '../../../../repositories/CategoriesRepositoryInMemory';
import { GetCategoriesService } from '../../../../../src/graphql/schema/categories/services/GetCategoriesService';

describe('Get categories service', () => {
  it('Should execute', async () => {
    const categoriesRepository = new CategoriesRepositoryInMemory();
    const mocks = categoriesRepository.mockCreateMany();

    const sut = new GetCategoriesService(categoriesRepository);
    const orders = await sut.execute();

    expect(orders).toHaveLength(mocks.length);
  });
});
