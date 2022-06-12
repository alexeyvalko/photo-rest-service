import { HttpStatus } from '@nestjs/common';
import { ResponseTypeUnsplash } from './helpers';

export interface IResponseUnsplash<T> {
  type: ResponseTypeUnsplash;
  status: HttpStatus;
  response: {
    results: T[];
    total: number;
  };
  errors?: never;
  originalResponse: {
    size: number;
    timeout: number;
  };
}
