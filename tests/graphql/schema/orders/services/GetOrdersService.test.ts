import { describe, expect, it } from 'vitest';
import { OrdersRepositoryInMemory } from '../../../../repositories/OrdersRepositoryInMemory';
import { GetOrdersService } from '../../../../../src/graphql/schema/orders/services/GetOrdersService';

describe('Get orders service', () => {
  it('Should execute', async () => {
    const ordersRepository = new OrdersRepositoryInMemory();
    const mocks = ordersRepository.mockCreateMany();

    const sut = new GetOrdersService(ordersRepository);
    const orders = await sut.execute();

    expect(orders).toHaveLength(mocks.length);
  });
});
