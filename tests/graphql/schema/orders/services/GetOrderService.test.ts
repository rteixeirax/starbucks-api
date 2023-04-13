import { describe, expect, it } from 'vitest';
import { OrdersRepositoryInMemory } from '../../../../repositories/OrdersRepositoryInMemory';
import { GetOrderService } from '../../../../../src/graphql/schema/orders/services/GetOrderService';

describe('Get order service', () => {
  it('Should execute', async () => {
    const ordersRepository = new OrdersRepositoryInMemory();
    const mocks = ordersRepository.mockCreateMany();

    const sut = new GetOrderService(ordersRepository);
    const order = await sut.execute({ orderId: mocks[0].orderId });

    expect(order).not.toBeNull();
    expect(order?.orderId).toStrictEqual(mocks[0].orderId);
  });
});
