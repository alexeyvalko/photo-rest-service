export interface IResponse<T> {
  type: string;
  status: number;
  response: {
    results: T[];
    total: number;
  };
  originalResponse: {
    size: number;
    timeout: number;
  };
}
