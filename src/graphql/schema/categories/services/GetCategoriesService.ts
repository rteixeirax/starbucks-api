import { IService } from '../../../../contracts/IService';
import { CategoryDto } from '../dtos/CategoryDto';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

export class GetCategoriesService implements IService<undefined, CategoryDto[]> {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<CategoryDto[]> {
    return this.categoriesRepository.findAll();
  }
}
