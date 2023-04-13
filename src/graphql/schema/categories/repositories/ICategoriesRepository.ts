import { IRepository } from '../../../../contracts/IRepository';
import { CategoryDto } from '../dtos/CategoryDto';
import { CreateCategoryDataDto } from '../dtos/CreateCategoryDataDto';

export interface ICategoriesRepository extends IRepository<CategoryDto, CreateCategoryDataDto> {}
