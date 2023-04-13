import { Order } from '@prisma/client';
import { IOrdersRepository } from './IOrdersRepository';
import { OrderDto } from '../dtos/OrderDto';
import { prismaClient } from '../../../../data/prismaClient';
import { CreateOrderDataDto } from '../dtos/CreateOrderDataDto';

export class OrdersRepository implements IOrdersRepository {
  mapDbModelToDto(model: Order): OrderDto {
    return {
      orderId: model.orderId,
      productId: model.productId,
      receivedAmount: model.receivedAmount as unknown as number,
      exchange: model.exchange as unknown as number,
    };
  }

  async findAll(ids?: string[]): Promise<OrderDto[]> {
    const orders = ids
      ? await prismaClient.order.findMany({ where: { orderId: { in: ids } } })
      : await prismaClient.order.findMany();
    return orders.map((order) => this.mapDbModelToDto(order));
  }

  async findById(id: string): Promise<OrderDto | null> {
    const order = await prismaClient.order.findFirst({
      where: { orderId: id },
    });
    return order ? this.mapDbModelToDto(order) : null;
  }

  async save(data: CreateOrderDataDto): Promise<OrderDto> {
    const order = await prismaClient.order.create({
      data: {
        receivedAmount: data.receivedAmount,
        exchange: data.exchange,
        productId: data.productId,
      },
    });

    return this.mapDbModelToDto(order);
  }
}
