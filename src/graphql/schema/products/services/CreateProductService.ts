import { ProductDto } from '../dtos/ProductDto';
import { IService } from '../../../../contracts/IService';
import { CreateProductDataDto } from '../dtos/CreateProductDataDto';
import { IProductsRepository } from '../repositories/IProductsRepository';
import { ValidationException } from '../../../../exceptions/ValidationException';
import { ICategoriesRepository } from '../../categories/repositories/ICategoriesRepository';

export class CreateProductService implements IService<CreateProductDataDto, ProductDto> {
  constructor(
    private readonly productsRepository: IProductsRepository,
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(data: CreateProductDataDto): Promise<ProductDto> {
    const category = await this.categoriesRepository.findById(data.categoryId);

    if (!category) {
      throw new ValidationException('Invalid categoryId');
    }

    return this.productsRepository.save(data);
  }
}
