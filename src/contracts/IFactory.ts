export interface IFactory<TReturnFactory> {
  make(): TReturnFactory;
}
