import { Arg, Query, Resolver } from 'type-graphql';
import { BadRequest, OK } from '../../../../utils/buildApiResponse';
import { OrderDto } from '../dtos/OrderDto';
import { OrderResponseDto } from '../dtos/OrderResponseDto';
import { GetOrderServiceFactory } from '../factories/GetOrderServiceFactory';

@Resolver(OrderDto)
export default class GetOrderResolver {
  @Query(() => OrderResponseDto)
  async getOrder(@Arg('orderId') orderId: string) {
    try {
      const getOrderService = new GetOrderServiceFactory().make();

      return OK(await getOrderService.execute({ orderId }));
    } catch (error: any) {
      return BadRequest(error.message);
    }
  }
}
