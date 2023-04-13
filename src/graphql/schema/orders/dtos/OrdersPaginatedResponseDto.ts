import { ObjectType } from 'type-graphql';
import { ApiPaginatedResponse } from '../../../shared/ApiPaginatedResponse';
import { OrderDto } from './OrderDto';

@ObjectType('OrderPaginatedResponse')
export class OrdersPaginatedResponseDto extends ApiPaginatedResponse(OrderDto) {}
