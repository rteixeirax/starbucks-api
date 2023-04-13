import { Query, Resolver } from 'type-graphql';
import { BadRequest, OK } from '../../../../utils/buildApiResponse';
import { ExtraDto } from '../dto/ExtraDto';
import { ExtrasPaginatedResponseDto } from '../dto/ExtrasPaginatedResponseDto';
import { GetExtrasServiceFactory } from '../factories/GetExtrasServiceFactory';

@Resolver(ExtraDto)
export default class GetExtrasResolver {
  @Query(() => ExtrasPaginatedResponseDto)
  async getExtras() {
    try {
      const getExtrasService = new GetExtrasServiceFactory().make();

      return OK(await getExtrasService.execute());
    } catch (error: any) {
      return BadRequest(error.message);
    }
  }
}
