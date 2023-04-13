import { IFactory } from '../../../../contracts/IFactory';
import { OrdersRepository } from '../repositories/OrdersRepository';
import { CreateOrderService } from '../services/CreateOrderService';
import { ProductsRepository } from '../../products/repositories/ProductsRepository';
import { ExtrasRepository } from '../../extras/repositories/ExtrasRepository';

export class CreateOrderServiceFactory implements IFactory<CreateOrderService> {
  make(): CreateOrderService {
    const ordersRepository = new OrdersRepository();
    const productsRepository = new ProductsRepository();
    const extrasRepository = new ExtrasRepository();
    return new CreateOrderService(ordersRepository, productsRepository, extrasRepository);
  }
}
