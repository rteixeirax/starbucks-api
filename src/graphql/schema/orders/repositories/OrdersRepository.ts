import { Order } from '@prisma/client';
import { IOrdersRepository } from './IOrdersRepository';
import { OrderDto } from '../dtos/OrderDto';
import { prismaClient } from '../../../../data/prismaClient';
import { CreateOrderDataDto } from '../dtos/CreateOrderDto';

export class OrdersRepository implements IOrdersRepository {
  mapDbModelToDto(model: Order): OrderDto {
    return {
      orderId: model.orderId,
      productId: model.productId,
      receivedAmount: model.receivedAmount as unknown as number,
      exchange: model.exchange as unknown as number,
    };
  }

  async findAll(): Promise<OrderDto[]> {
    const orders = await prismaClient.order.findMany();
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
