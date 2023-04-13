import { ObjectType } from 'type-graphql';
import { ApiPaginatedResponse } from '../../../shared/ApiPaginatedResponse';
import { CategoryDto } from './CategoryDto';

@ObjectType('CategoriesPaginatedResponse')
export class CategoriesPaginatedResponseDto extends ApiPaginatedResponse(CategoryDto) {}
