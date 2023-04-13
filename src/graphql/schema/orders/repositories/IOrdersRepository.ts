import { IRepository } from '../../../../contracts/IRepository';
import { OrderDto } from '../dtos/OrderDto';
import { CreateOrderDataDto } from '../dtos/CreateOrderDataDto';

export interface IOrdersRepository extends IRepository<OrderDto, CreateOrderDataDto> {}
