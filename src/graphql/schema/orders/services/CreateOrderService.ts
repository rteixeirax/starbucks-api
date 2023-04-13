import { IService } from '../../../../contracts/IService';
import { CreateOrderDataDto } from '../dtos/CreateOrderDataDto';
import { OrderDto } from '../dtos/OrderDto';
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { IOrdersRepository } from '../repositories/IOrdersRepository';
import { IExtrasRepository } from '../../extras/repositories/IExtrasRepository';
import { ValidationException } from '../../../../exceptions/ValidationException';
import { ExtraDto } from '../../extras/dto/ExtraDto';

export class CreateOrderService implements IService<CreateOrderDataDto, OrderDto> {
  constructor(
    private readonly ordersRepository: IOrdersRepository,
    private readonly productsRepository: IProductsRepository,
    private readonly extrasRepository: IExtrasRepository,
  ) {}

  async execute(data: CreateOrderDataDto): Promise<OrderDto> {
    const product = await this.productsRepository.findById(data.productId);

    if (!product) {
      throw new ValidationException('Invalid productId');
    }

    if (product.stock <= 0) {
      throw new ValidationException('No stock available');
    }

    let extras: ExtraDto[] = [];

    if (data.extrasIds?.length) {
      extras = await this.extrasRepository.findAll(data.extrasIds);

      if (!extras.length || extras.length !== data.extrasIds.length) {
        throw new ValidationException('Invalid extrasIds');
      }
    }

    const extrasAmount = extras.reduce((acc, extra) => acc + extra.price, 0);
    const total = product.price + extrasAmount;

    if (data.receivedAmount < total) {
      throw new ValidationException('Insufficient funds');
    }

    const exchange = data.receivedAmount - total;

    await this.productsRepository.update({ ...product, stock: product.stock - 1 });

    return this.ordersRepository.save({ ...data, exchange, total });
  }
}
