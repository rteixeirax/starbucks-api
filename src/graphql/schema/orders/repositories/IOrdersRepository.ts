import { IRepository } from '../../../../contracts/IRepository';
import { OrderDto } from '../dtos/OrderDto';
import { CreateOrderDataDto } from '../dtos/CreateOrderDto';

export interface IOrdersRepository extends IRepository<OrderDto, CreateOrderDataDto> {}
