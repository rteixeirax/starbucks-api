import { ProductsRepository } from '../repositories/ProductsRepository';
import { IFactory } from '../../../../contracts/IFactory';
import { CreateProductService } from '../services/CreateProductService';
import { CategoryRepository } from '../../categories/repositories/CategoryRepository';

export class CreateProductServiceFactory implements IFactory<CreateProductService> {
  make(): CreateProductService {
    const productsRepository = new ProductsRepository();
    const categoriesRepository = new CategoryRepository();
    return new CreateProductService(productsRepository, categoriesRepository);
  }
}
