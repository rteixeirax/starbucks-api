import { describe, expect, it } from 'vitest';
import { ExtrasRepositoryInMemory } from '../../../../repositories/ExtrasRepositoryInMemory';
import { GetExtrasService } from '../../../../../src/graphql/schema/extras/services/GetExtrasService';

describe('Get orders service', () => {
  it('Should execute', async () => {
    const extrasRepository = new ExtrasRepositoryInMemory();
    const mocks = extrasRepository.mockCreateMany();

    const sut = new GetExtrasService(extrasRepository);
    const orders = await sut.execute();

    expect(orders).toHaveLength(mocks.length);
  });
});
