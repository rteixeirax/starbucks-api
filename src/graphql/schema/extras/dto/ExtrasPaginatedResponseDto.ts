import { ObjectType } from 'type-graphql';
import { ApiPaginatedResponse } from '../../../shared/ApiPaginatedResponse';
import { ExtraDto } from './ExtraDto';

@ObjectType('ExtraPaginatedResponse')
export class ExtrasPaginatedResponseDto extends ApiPaginatedResponse(ExtraDto) {}
