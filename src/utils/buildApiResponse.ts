import { IApiResponse } from '../contracts/IApiResponse';

export function OK<TData>(data: TData): IApiResponse<TData> {
  return {
    data,
    isSuccess: true,
    isError: false,
    error: null,
  };
}

export function BadRequest(error: string): IApiResponse<null> {
  return {
    data: null,
    isSuccess: false,
    isError: true,
    error,
  };
}
