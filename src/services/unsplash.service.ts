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

  async getPhotoList(options: IPhotoListOptions): Promise<IResponsePhotos<PhotoBasic>> {
    console.log(options);
    const response: IResponseUnsplash<PhotoBasic> = await this.unsplash.photos.list(options);

    const {
      type,
      status,
      response: { results, total },
    } = response;

    if (status === HttpStatus.OK) {
      console.log(results.length);
      return {
        type,
        statusCode: status,
        results: this.addNewPhotoSize(results, 'medium', '600'),
        total,
        total_pages: Math.ceil(total / options.perPage),
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

  private addNewPhotoSize(photos: PhotoBasic[], sizeName: string, size: string): PhotoBasic[] {
    const SMALL_SIZE = 'w=400';
    const NEW_SIZE = `w=${size}`;
    const resultsWithMediumSize = photos.map((photo) => {
      const smallSizeURlArray = photo.urls.small.split('&');
      const isCanCreateNewSize =
        smallSizeURlArray.lastIndexOf(SMALL_SIZE) === smallSizeURlArray.length - 1;
      if (isCanCreateNewSize) {
        smallSizeURlArray.splice(-1, 1, NEW_SIZE);
        photo.urls[sizeName] = smallSizeURlArray.join('&');
      } else {
        photo.urls[sizeName] = photo.urls.regular;
      }
      return photo;
    });

    return resultsWithMediumSize;
  }
}
