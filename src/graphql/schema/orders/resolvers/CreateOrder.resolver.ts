import { Arg, Mutation, Resolver } from 'type-graphql';
import { BadRequest, OK } from '../../../../utils/buildApiResponse';
import { OrderDto } from '../dtos/OrderDto';
import { OrderResponseDto } from '../dtos/OrderResponseDto';
import { CreateOrderDataDto } from '../dtos/CreateOrderDataDto';
import { CreateOrderServiceFactory } from '../factories/CreateOrderServiceFactory';

@Resolver(OrderDto)
export default class CreateOrderResolver {
  @Mutation(() => OrderResponseDto)
  async createOrder(@Arg('data') data: CreateOrderDataDto) {
    try {
      const createOrderService = new CreateOrderServiceFactory().make();

      return OK(await createOrderService.execute(data));
    } catch (error: any) {
      return BadRequest(error.message);
    }
  }
}
