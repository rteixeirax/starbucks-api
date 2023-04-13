import { IRepository } from '../../../../contracts/IRepository';
import { ExtraDto } from '../dto/ExtraDto';
import { CreateExtraDataDto } from '../dto/CreateExtraDataDto';

export interface IExtrasRepository extends IRepository<ExtraDto, CreateExtraDataDto> {}
