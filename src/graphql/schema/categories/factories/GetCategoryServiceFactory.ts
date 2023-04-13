import { IFactory } from '../../../../contracts/IFactory';
import { GetCategoryService } from '../services/GetCategoryService';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

export class GetCategoryServiceFactory implements IFactory<GetCategoryService> {
  make(): GetCategoryService {
    const categoryRepository = new CategoriesRepository();
    return new GetCategoryService(categoryRepository);
  }
}
