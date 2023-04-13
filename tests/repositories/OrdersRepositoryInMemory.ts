import crypto from 'node:crypto';
import { IOrdersRepository } from '../../src/graphql/schema/orders/repositories/IOrdersRepository';
import { OrderDto } from '../../src/graphql/schema/orders/dtos/OrderDto';
import { CreateOrderDataDto } from '../../src/graphql/schema/orders/dtos/CreateOrderDataDto';

export class OrdersRepositoryInMemory implements IOrdersRepository {
  orders: OrderDto[] = [];

  async findAll(): Promise<OrderDto[]> {
    return this.orders;
  }

  async findById(id: string): Promise<OrderDto | null> {
    return this.orders.find((order) => order.orderId === id) || null;
  }

  async save(data: CreateOrderDataDto): Promise<OrderDto> {
    const newOrder = {
      orderId: crypto.randomUUID(),
      total: 0,
      ...data,
    };

    this.orders.push(newOrder);
    return newOrder;
  }

  async update(data: OrderDto): Promise<OrderDto> {
    const idx = this.orders.findIndex((order) => order.orderId === data.orderId);

    this.orders[idx] = {
      ...this.orders[idx],
      ...data,
    };

    return this.orders[idx];
  }

  mockCreate(data?: Partial<OrderDto>) {
    const newData: OrderDto = {
      orderId: data?.orderId || crypto.randomUUID(),
      receivedAmount: data?.receivedAmount ?? 0,
      exchange: data?.exchange ?? 0,
      total: data?.total ?? 0,
      productId: data?.productId || crypto.randomUUID(),
    };
    this.orders.push(newData);
    return newData;
  }

  mockCreateMany(args?: { qty?: number; data?: Partial<OrderDto> }) {
    const { qty = 5, data } = args || {};

    const returnData: OrderDto[] = [];
    for (let i = 0; i < qty; i += 1) {
      returnData.push(this.mockCreate(data));
    }
    return returnData;
  }
}
