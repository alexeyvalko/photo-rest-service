import { PhotoBasic } from '../types/unsplash/photos';
import fetch from 'node-fetch';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createApi } from 'unsplash-js';
import { ConfigService } from '@nestjs/config';
import { Unsplash } from 'src/types/unsplash/unsplash';
import { IResponseUnsplash } from 'src/types/unsplash/responses';
import { IPhotoListOptions, IResponsePhotos, ISearchOptions } from 'src/types/interfaces';

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
    try {
      const response: IResponseUnsplash<PhotoBasic> = await this.unsplash.photos.list(options);
      const {
        type,
        status,
        response: { results, total },
      } = response;
      if (status === HttpStatus.OK) {
        const filteredAdsResults = results.filter((photo) => !photo.sponsorship);
        return {
          type,
          statusCode: status,
          total,
          total_pages: Math.ceil(total / options.perPage),
          results: this.addNewPhotoSize(filteredAdsResults, 'medium', 600),
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
    } catch (error) {
      throw new HttpException(
        {
          type: 'error',
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async searchPhotos(options: ISearchOptions): Promise<IResponsePhotos<PhotoBasic>> {
    try {
      const response: IResponseUnsplash<PhotoBasic> = await this.unsplash.search.getPhotos(options);
      const {
        type,
        status,
        response: { results, total, total_pages },
      } = response;
      if (status === HttpStatus.OK) {
        const filteredAdsResults = results.filter((photo) => !photo.sponsorship);
        return {
          type,
          statusCode: status,
          total,
          total_pages,
          results: this.addNewPhotoSize(filteredAdsResults, 'medium', 600),
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          type: 'error',
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private addNewPhotoSize(photos: PhotoBasic[], sizeName: string, size: number): PhotoBasic[] {
    const SMALL_SIZE = 'w=400';
    const NEW_SIZE = `w=${size}`;
    const resultsWithNewSize = photos.map((photo) => {
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

    return resultsWithNewSize;
  }
}
