import { Query, Resolver } from 'type-graphql';
import { BadRequest, OK } from '../../../../utils/buildApiResponse';
import { OrderDto } from '../dtos/OrderDto';
import { GetOrdersServiceFactory } from '../factories/GetOrdersServiceFactory';
import { OrdersPaginatedResponseDto } from '../dtos/OrdersPaginatedResponseDto';

@Resolver(OrderDto)
export default class GetOrdersResolver {
  @Query(() => OrdersPaginatedResponseDto)
  async getOrders() {
    try {
      const getOrderService = new GetOrdersServiceFactory().make();

      return OK(await getOrderService.execute());
    } catch (error: any) {
      return BadRequest(error.message);
    }
  }
}
