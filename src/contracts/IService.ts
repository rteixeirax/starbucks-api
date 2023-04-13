export interface IService<TArgs, TReturnValue> {
  execute(args: TArgs): Promise<TReturnValue>;
}
