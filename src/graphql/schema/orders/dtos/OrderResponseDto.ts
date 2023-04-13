import { ObjectType } from 'type-graphql';
import { ApiResponse } from '../../../shared/ApiResponse';
import { OrderDto } from './OrderDto';

@ObjectType('OrderResponse')
export class OrderResponseDto extends ApiResponse(OrderDto) {}
