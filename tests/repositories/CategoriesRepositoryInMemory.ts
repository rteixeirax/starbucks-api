import crypto from 'node:crypto';
import { ICategoriesRepository } from '../../src/graphql/schema/categories/repositories/ICategoriesRepository';
import { CategoryDto } from '../../src/graphql/schema/categories/dtos/CategoryDto';
import { CreateCategoryDataDto } from '../../src/graphql/schema/categories/dtos/CreateCategoryDataDto';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: CategoryDto[] = [];

  async findAll(): Promise<CategoryDto[]> {
    return this.categories;
  }

  async findById(id: string): Promise<CategoryDto | null> {
    return this.categories.find((category) => category.categoryId === id) || null;
  }

  async save(data: CreateCategoryDataDto): Promise<CategoryDto> {
    const newCategory = {
      categoryId: crypto.randomUUID(),
      ...data,
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  async update(data: CategoryDto): Promise<CategoryDto> {
    const idx = this.categories.findIndex((category) => category.categoryId === data.categoryId);

    this.categories[idx] = {
      ...this.categories[idx],
      ...data,
    };

    return this.categories[idx];
  }

  mockCreate(data?: Partial<CategoryDto>) {
    const newData = {
      categoryId: data?.categoryId || crypto.randomUUID(),
      name: data?.name || 'fake category',
    };
    this.categories.push(newData);
    return newData;
  }

  mockCreateMany(args?: { qty?: number; data?: Partial<CategoryDto> }) {
    const { qty = 5, data } = args || {};

    const returnData: CategoryDto[] = [];
    for (let i = 0; i < qty; i += 1) {
      returnData.push(this.mockCreate(data));
    }
    return returnData;
  }
}
