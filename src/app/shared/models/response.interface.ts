export interface Response<T> {
  errorMessage: string | null;
  result: T;
}
