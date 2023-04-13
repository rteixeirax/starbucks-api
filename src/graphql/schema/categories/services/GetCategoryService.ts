import { IService } from '../../../../contracts/IService';
import { CategoryDto } from '../dtos/CategoryDto';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

export class GetCategoryService implements IService<{ categoryId: string }, CategoryDto | null> {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute(args: { categoryId: string }): Promise<CategoryDto | null> {
    return this.categoriesRepository.findById(args.categoryId);
  }
}
