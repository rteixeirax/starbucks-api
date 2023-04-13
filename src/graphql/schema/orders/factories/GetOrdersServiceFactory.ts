import { IFactory } from '../../../../contracts/IFactory';
import { GetOrdersService } from '../services/GetOrdersService';
import { OrdersRepository } from '../repositories/OrdersRepository';

export class GetOrdersServiceFactory implements IFactory<GetOrdersService> {
  make(): GetOrdersService {
    const ordersRepository = new OrdersRepository();
    return new GetOrdersService(ordersRepository);
  }
}
