import crypto from 'node:crypto';
import { IExtrasRepository } from '../../src/graphql/schema/extras/repositories/IExtrasRepository';
import { ExtraDto } from '../../src/graphql/schema/extras/dto/ExtraDto';
import { CreateExtraDataDto } from '../../src/graphql/schema/extras/dto/CreateExtraDataDto';

export class ExtrasRepositoryInMemory implements IExtrasRepository {
  extras: ExtraDto[] = [];

  async findAll(ids?: string[]): Promise<ExtraDto[]> {
    return ids ? this.extras.filter((extra) => ids.includes(extra.extraId)) : this.extras;
  }

  async findById(id: string): Promise<ExtraDto | null> {
    return this.extras.find((extra) => extra.extraId === id) || null;
  }

  async save(data: CreateExtraDataDto): Promise<ExtraDto> {
    const newOrder = {
      extraId: crypto.randomUUID(),
      ...data,
    };

    this.extras.push(newOrder);
    return newOrder;
  }

  async update(data: ExtraDto): Promise<ExtraDto> {
    const idx = this.extras.findIndex((extra) => extra.extraId === data.extraId);

    this.extras[idx] = {
      ...this.extras[idx],
      ...data,
    };

    return this.extras[idx];
  }

  mockCreate(data?: Partial<ExtraDto>) {
    const newData: ExtraDto = {
      extraId: data?.extraId || crypto.randomUUID(),
      name: data?.name || 'fake name',
      price: data?.price ?? 0,
    };
    this.extras.push(newData);
    return newData;
  }

  mockCreateMany(args?: { qty?: number; data?: Partial<ExtraDto> }) {
    const { qty = 5, data } = args || {};

    const returnData: ExtraDto[] = [];
    for (let i = 0; i < qty; i += 1) {
      returnData.push(this.mockCreate(data));
    }
    return returnData;
  }
}
