export interface IRepository<TReturnValues, TData = undefined> {
  findAll(ids?: string[]): Promise<TReturnValues[]>;

  findById(id: string): Promise<TReturnValues | null>;

  save(data: TData): Promise<TReturnValues>;
}
