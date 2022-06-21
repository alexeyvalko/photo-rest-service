import { HttpStatus } from '@nestjs/common';
import { ResponseTypeUnsplash } from './helpers';

export interface IResponseUnsplash<T> {
  type: ResponseTypeUnsplash;
  status: HttpStatus;
  response: {
    results: T[];
    total: number;
    total_pages: number;
  };
  errors?: never;
  originalResponse: {
    size: number;
    timeout: number;
  };
}

export interface IResponsePhotoUnsplash<T> {
  type: ResponseTypeUnsplash;
  status: HttpStatus;
  response: T;
  errors?: never;
  originalResponse: {
    size: number;
    timeout: number;
  };
}
