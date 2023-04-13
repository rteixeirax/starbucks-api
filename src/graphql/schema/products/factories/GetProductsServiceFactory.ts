import { GetProductsService } from '../services/GetProductsService';
import { ProductsRepository } from '../repositories/ProductsRepository';
import { IFactory } from '../../../../contracts/IFactory';

export class GetProductsServiceFactory implements IFactory<GetProductsService> {
  make(): GetProductsService {
    const productsRepository = new ProductsRepository();
    return new GetProductsService(productsRepository);
  }
}
