import { ObjectType } from 'type-graphql';
import { ProductDto } from './ProductDto';
import { ApiResponse } from '../../../shared/ApiResponse';

@ObjectType('ProductResponse')
export class ProductResponseDto extends ApiResponse(ProductDto) {}
