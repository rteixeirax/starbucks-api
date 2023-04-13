import { IFactory } from '../../../../contracts/IFactory';
import { GetCategoriesService } from '../services/GetCategoriesService';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

export class GetCategoriesServiceFactory implements IFactory<GetCategoriesService> {
  make(): GetCategoriesService {
    const categoriesRepository = new CategoriesRepository();
    return new GetCategoriesService(categoriesRepository);
  }
}
