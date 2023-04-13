import { IService } from '../../../../contracts/IService';
import { OrderDto } from '../dtos/OrderDto';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

export class GetOrderService implements IService<{ orderId: string }, OrderDto | null> {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(args: { orderId: string }): Promise<OrderDto | null> {
    return this.ordersRepository.findById(args.orderId);
  }
}
