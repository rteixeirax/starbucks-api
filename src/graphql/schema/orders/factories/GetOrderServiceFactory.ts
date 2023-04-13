import { IFactory } from '../../../../contracts/IFactory';
import { GetOrderService } from '../services/GetOrderService';
import { OrdersRepository } from '../repositories/OrdersRepository';

export class GetOrderServiceFactory implements IFactory<GetOrderService> {
  make(): GetOrderService {
    const ordersRepository = new OrdersRepository();
    return new GetOrderService(ordersRepository);
  }
}
