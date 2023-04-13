import { ObjectType } from 'type-graphql';
import { ProductDto } from './ProductDto';
import { ApiPaginatedResponse } from '../../../shared/ApiPaginatedResponse';

@ObjectType('ProductPaginatedResponse')
export class ProductsPaginatedResponseDto extends ApiPaginatedResponse(ProductDto) {}
