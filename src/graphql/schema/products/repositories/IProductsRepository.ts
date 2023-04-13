import { ProductDto } from '../dtos/ProductDto';
import { IRepository } from '../../../../contracts/IRepository';
import { CreateProductDataDto } from '../dtos/CreateProductDataDto';

export interface IProductsRepository extends IRepository<ProductDto, CreateProductDataDto> {}
