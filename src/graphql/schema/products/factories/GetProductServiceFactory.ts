import { ProductsRepository } from '../repositories/ProductsRepository';
import { IFactory } from '../../../../contracts/IFactory';
import { GetProductService } from '../services/GetProductService';

export class GetProductServiceFactory implements IFactory<GetProductService> {
  make(): GetProductService {
    const productsRepository = new ProductsRepository();
    return new GetProductService(productsRepository);
  }
}
