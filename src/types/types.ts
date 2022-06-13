import { HttpStatus } from '@nestjs/common';
import { OrderByType, ResponseTypeUnsplash } from './unsplash/helpers';

export interface IPhotoListOptions {
  page: number;
  perPage: number;
  orderBy: OrderByType;
}

export interface IResponsePhotos<T> {
  type: ResponseTypeUnsplash;
  statusCode: HttpStatus;
  results: T[];
  errors?: never;
  total: number;
  total_pages: number;
}
