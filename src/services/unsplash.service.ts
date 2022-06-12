import { PhotoBasic } from '../types/unsplash/photos';
import fetch from 'node-fetch';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createApi } from 'unsplash-js';
import { ConfigService } from '@nestjs/config';
import { Unsplash } from 'src/types/unsplash/unsplash';
import { IResponseUnsplash } from 'src/types/unsplash/responses';
import { IPhotoListOptions, IResponsePhotos } from 'src/types/types';

@Injectable()
export class UnsplashService {
  unsplash: Unsplash;

  constructor(private configService: ConfigService) {
    this.unsplash = createApi({
      accessKey: this.configService.get('unsplash.accessKey'),
      fetch: fetch,
    });
  }

  async getPhotoList(
    options: IPhotoListOptions,
  ): Promise<IResponsePhotos<PhotoBasic>> {
    const response: IResponseUnsplash<PhotoBasic> =
      await this.unsplash.photos.list(options);

    const {
      type,
      status,
      response: { results, total },
    } = response;
    if (status === HttpStatus.OK) {
      return {
        type,
        statusCode: status,
        results,
        total,
        total_pages: Math.ceil(total / 30),
      };
    } else {
      throw new HttpException(
        {
          type,
          statusCode: status,
          message: 'Error while fetching list of photos',
        },
        status,
      );
    }
  }
}
