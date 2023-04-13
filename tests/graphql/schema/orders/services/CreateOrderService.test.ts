import { beforeEach, describe, expect, it } from 'vitest';
import { ProductsRepositoryInMemory } from '../../../../repositories/ProductsRepositoryInMemory';
import { OrdersRepositoryInMemory } from '../../../../repositories/OrdersRepositoryInMemory';
import { ExtrasRepositoryInMemory } from '../../../../repositories/ExtrasRepositoryInMemory';
import { CreateOrderService } from '../../../../../src/graphql/schema/orders/services/CreateOrderService';
import { CreateOrderDataDto } from '../../../../../src/graphql/schema/orders/dtos/CreateOrderDataDto';

describe('Create order service', () => {
  let productsRepository: ProductsRepositoryInMemory;
  let ordersRepository: OrdersRepositoryInMemory;
  let extrasRepository: ExtrasRepositoryInMemory;
  let sut: CreateOrderService;

  beforeEach(() => {
    productsRepository = new ProductsRepositoryInMemory();
    ordersRepository = new OrdersRepositoryInMemory();
    extrasRepository = new ExtrasRepositoryInMemory();
    sut = new CreateOrderService(ordersRepository, productsRepository, extrasRepository);
  });

  it('Should execute', async () => {
    const mockExtras = extrasRepository.mockCreateMany();
    const mockProduct = productsRepository.mockCreate();

    const selectedExtras = [mockExtras[0], mockExtras[1]];
    const extrasAmount = selectedExtras.reduce((acc, extra) => acc + extra.price, 0);
    const receivedAmount = mockProduct.price + extrasAmount;

    const mockOrder: CreateOrderDataDto = {
      productId: mockProduct.productId,
      extrasIds: selectedExtras.map((extra) => extra.extraId),
      receivedAmount,
    };

    const order = await sut.execute(mockOrder);
    const updatedProduct = await productsRepository.findById(mockProduct.productId);

    expect(order).not.toBeNull();
    expect(order?.orderId).toBeDefined();
    expect(order.productId).toStrictEqual(mockProduct.productId);
    expect(order.receivedAmount).toStrictEqual(receivedAmount);
    expect(order.exchange).toStrictEqual(0);
    expect(order.total).toStrictEqual(receivedAmount);
    expect(updatedProduct?.stock).toStrictEqual(mockProduct.stock - 1);
  });

  it('Should execute without product extras', async () => {
    const mockProduct = productsRepository.mockCreate();

    const mockOrder: CreateOrderDataDto = {
      productId: mockProduct.productId,
      extrasIds: [],
      receivedAmount: mockProduct.price,
    };

    const order = await sut.execute(mockOrder);
    const updatedProduct = await productsRepository.findById(mockProduct.productId);

    expect(order).not.toBeNull();
    expect(order?.orderId).toBeDefined();
    expect(order.productId).toStrictEqual(mockProduct.productId);
    expect(order.receivedAmount).toStrictEqual(mockProduct.price);
    expect(order.exchange).toStrictEqual(0);
    expect(updatedProduct?.stock).toStrictEqual(mockProduct.stock - 1);
  });

  it('Should throw validation error with invalid productId', async () => {
    const mockExtra = extrasRepository.mockCreate();

    const mockOrder: CreateOrderDataDto = {
      productId: 'invalid-product-id',
      extrasIds: [mockExtra.extraId],
      receivedAmount: 10,
    };

    expect(async () => {
      await sut.execute(mockOrder);
    }).rejects.toThrowError('Invalid productId');
  });

  it('Should throw validation error with invalid extrasIds', async () => {
    const mockProduct = productsRepository.mockCreate();

    const mockOrder: CreateOrderDataDto = {
      productId: mockProduct.productId,
      extrasIds: ['fake-extra-id'],
      receivedAmount: 10,
    };

    expect(async () => {
      await sut.execute(mockOrder);
    }).rejects.toThrowError('Invalid extrasIds');
  });

  it('Should throw validation error with invalid extrasIds (mixed ids)', async () => {
    const mockProduct = productsRepository.mockCreate();
    const mockExtra = extrasRepository.mockCreate();

    const mockOrder: CreateOrderDataDto = {
      productId: mockProduct.productId,
      extrasIds: ['fake-extra-id', mockExtra.extraId],
      receivedAmount: 10,
    };

    expect(async () => {
      await sut.execute(mockOrder);
    }).rejects.toThrowError('Invalid extrasIds');
  });

  it('Should throw validation error with no stock available', async () => {
    const mockProduct = productsRepository.mockCreate({ stock: 0 });
    const mockExtra = extrasRepository.mockCreate();

    const mockOrder: CreateOrderDataDto = {
      productId: mockProduct.productId,
      extrasIds: [mockExtra.extraId],
      receivedAmount: 10,
    };

    expect(async () => {
      await sut.execute(mockOrder);
    }).rejects.toThrowError('No stock available');
  });

  it('Should throw validation error with insufficient founds', async () => {
    const mockProduct = productsRepository.mockCreate();
    const mockExtras = extrasRepository.mockCreateMany();
    const selectedExtras = [mockExtras[0], mockExtras[1]];
    const extrasAmount = selectedExtras.reduce((acc, extra) => acc + extra.price, 0);
    const receivedAmount = mockProduct.price + extrasAmount;

    const mockOrder: CreateOrderDataDto = {
      productId: mockProduct.productId,
      extrasIds: selectedExtras.map((extra) => extra.extraId),
      receivedAmount: receivedAmount - 5,
    };

    expect(async () => {
      await sut.execute(mockOrder);
    }).rejects.toThrowError('Insufficient funds');
  });
});
