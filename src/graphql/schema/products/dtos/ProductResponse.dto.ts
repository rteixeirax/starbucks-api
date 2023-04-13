import { ObjectType } from 'type-graphql';
import { ProductDto } from './Product.dto';
import { ApiResponse } from '../../../shared/ApiResponse';

@ObjectType('ProductResponse')
export class ProductResponseDto extends ApiResponse(ProductDto) {}
