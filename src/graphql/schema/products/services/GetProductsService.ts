import { IService } from '../../../../contracts/IService';
import { ProductDto } from '../dtos/ProductDto';
import { IProductsRepository } from '../repositories/IProductsRepository';

export class GetProductsService implements IService<undefined, ProductDto[]> {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(): Promise<ProductDto[]> {
    return this.productsRepository.findAll();
  }
}
