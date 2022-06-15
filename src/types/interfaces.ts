import { HttpStatus } from '@nestjs/common';
import {
  PhotosOrderByType,
  ResponseTypeUnsplash,
  SearchColorsType,
  SearchContentFilterType,
  SearchOrderType,
  SearchOrientationType,
} from './unsplash/helpers';

export interface IPhotoListOptions {
  page: number;
  perPage: number;
  orderBy: PhotosOrderByType;
}

export interface IResponsePhotos<T> {
  type: ResponseTypeUnsplash;
  statusCode: HttpStatus;
  results: T[];
  errors?: never;
  total: number;
  total_pages: number;
}

export interface ISearchOptions {
  query: string;
  page?: number;
  perPage?: number;
  orientation?: SearchOrientationType;
  contentFilter?: SearchContentFilterType;
  color?: SearchColorsType;
  orderBy?: SearchOrderType;
  collectionIds?: number[];
  lang?: string;
}
