import { IFactory } from '../../../../contracts/IFactory';
import { GetExtrasService } from '../services/GetExtrasService';
import { ExtrasRepository } from '../repositories/ExtrasRepository';

export class GetExtrasServiceFactory implements IFactory<GetExtrasService> {
  make(): GetExtrasService {
    const extrasRepository = new ExtrasRepository();
    return new GetExtrasService(extrasRepository);
  }
}
