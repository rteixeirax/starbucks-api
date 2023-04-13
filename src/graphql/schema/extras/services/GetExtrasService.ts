import { IService } from '../../../../contracts/IService';
import { ExtraDto } from '../dto/ExtraDto';
import { IExtrasRepository } from '../repositories/IExtrasRepository';

export class GetExtrasService implements IService<undefined, ExtraDto[]> {
  constructor(private readonly extrasRepository: IExtrasRepository) {}

  async execute(): Promise<ExtraDto[]> {
    return this.extrasRepository.findAll();
  }
}
