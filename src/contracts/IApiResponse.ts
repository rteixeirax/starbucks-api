export interface IApiResponse<TData> {
  data: TData | null;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
}
