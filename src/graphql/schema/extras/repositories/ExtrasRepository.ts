import { Extra } from '@prisma/client';
import { prismaClient } from '../../../../data/prismaClient';
import { IExtrasRepository } from './IExtrasRepository';
import { CreateExtraDataDto } from '../dto/CreateExtraDataDto';
import { ExtraDto } from '../dto/ExtraDto';

export class ExtrasRepository implements IExtrasRepository {
  mapDbModelToDto(model: Extra) {
    return {
      extraId: model.extraId,
      name: model.name,
      price: model.price as unknown as number,
    };
  }

  async findAll(ids?: string[]): Promise<ExtraDto[]> {
    const extras = ids
      ? await prismaClient.extra.findMany({ where: { extraId: { in: ids } } })
      : await prismaClient.extra.findMany();
    return extras.map((extra) => this.mapDbModelToDto(extra));
  }

  async findById(id: string): Promise<ExtraDto | null> {
    const extra = await prismaClient.extra.findFirst({
      where: { extraId: id },
    });
    return extra ? this.mapDbModelToDto(extra) : null;
  }

  async save(data: CreateExtraDataDto): Promise<ExtraDto> {
    const extra = await prismaClient.extra.create({
      data: {
        name: data.name,
        price: data.price,
      },
    });
    return this.mapDbModelToDto(extra);
  }

  async update(data: ExtraDto): Promise<ExtraDto> {
    const product = await prismaClient.extra.update({
      where: { extraId: data.extraId },
      data: {
        name: data.name,
        price: data.price,
      },
    });
    return this.mapDbModelToDto(product);
  }
}
