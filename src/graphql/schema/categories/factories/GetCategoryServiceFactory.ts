import { IFactory } from '../../../../contracts/IFactory';
import { GetCategoryService } from '../services/GetCategoryService';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class GetCategoryServiceFactory implements IFactory<GetCategoryService> {
  make(): GetCategoryService {
    const categoryRepository = new CategoryRepository();
    return new GetCategoryService(categoryRepository);
  }
}
