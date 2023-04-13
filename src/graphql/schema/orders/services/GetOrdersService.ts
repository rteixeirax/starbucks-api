import { IService } from '../../../../contracts/IService';
import { OrderDto } from '../dtos/OrderDto';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

export class GetOrdersService implements IService<undefined, OrderDto[]> {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(): Promise<OrderDto[]> {
    return this.ordersRepository.findAll();
  }
}
