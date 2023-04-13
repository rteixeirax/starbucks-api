import { ProductsRepository } from '../repositories/ProductsRepository';
import { IFactory } from '../../../../contracts/IFactory';
import { CreateProductService } from '../services/CreateProductService';
import { CategoriesRepository } from '../../categories/repositories/CategoriesRepository';

export class CreateProductServiceFactory implements IFactory<CreateProductService> {
  make(): CreateProductService {
    const productsRepository = new ProductsRepository();
    const categoriesRepository = new CategoriesRepository();
    return new CreateProductService(productsRepository, categoriesRepository);
  }
}
