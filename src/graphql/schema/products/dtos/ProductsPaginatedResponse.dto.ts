import { ObjectType } from 'type-graphql';
import { ProductDto } from './Product.dto';
import { ApiPaginatedResponse } from '../../../shared/ApiPaginatedResponse';

@ObjectType('ProductPaginatedResponse')
export class ProductsPaginatedResponseDto extends ApiPaginatedResponse(ProductDto) {}
