import { Category } from '@prisma/client';
import { ICategoriesRepository } from './ICategoriesRepository';
import { CategoryDto } from '../dtos/CategoryDto';
import { CreateCategoryDataDto } from '../dtos/CreateCategoryDataDto';
import { prismaClient } from '../../../../data/prismaClient';

export class CategoryRepository implements ICategoriesRepository {
  mapDbModelToDto(model: Category) {
    return {
      categoryId: model.categoryId,
      name: model.name,
    };
  }

  async findAll(ids?: string[]): Promise<CategoryDto[]> {
    const categories = ids
      ? await prismaClient.category.findMany({ where: { categoryId: { in: ids } } })
      : await prismaClient.category.findMany();
    return categories.map((category) => this.mapDbModelToDto(category));
  }

  async findById(id: string): Promise<CategoryDto | null> {
    const category = await prismaClient.category.findFirst({
      where: { categoryId: id },
    });
    return category ? this.mapDbModelToDto(category) : null;
  }

  async save(data: CreateCategoryDataDto): Promise<CategoryDto> {
    const category = await prismaClient.category.create({
      data: {
        name: data.name,
      },
    });

    return this.mapDbModelToDto(category);
  }
}
