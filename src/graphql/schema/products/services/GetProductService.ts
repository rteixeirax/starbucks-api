import { IService } from '../../../../contracts/IService';
import { ProductDto } from '../dtos/ProductDto';
import { IProductsRepository } from '../repositories/IProductsRepository';

export class GetProductService implements IService<{ productId: string }, ProductDto | null> {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(args: { productId: string }): Promise<ProductDto | null> {
    return this.productsRepository.findById(args.productId);
  }
}
