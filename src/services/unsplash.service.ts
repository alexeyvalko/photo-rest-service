import { PhotoBasic } from '../types/unsplash/photos';
import fetch from 'node-fetch';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createApi } from 'unsplash-js';
import { ConfigService } from '@nestjs/config';
import { Unsplash } from 'src/types/unsplash/unsplash';
import { IResponsePhotoUnsplash, IResponseUnsplash } from 'src/types/unsplash/responses';
import {
  IPhotoListOptions,
  IResponsePhoto,
  IResponsePhotos,
  ISearchOptions,
} from 'src/types/interfaces';
import { addNewPhotoSize } from 'src/utils/addNewPhotoSize';
import { DownloadLInkDto } from 'src/photos/dto/downloadLInkDto';

@Injectable()
export class UnsplashService {
  private readonly unsplash: Unsplash;
  private readonly newPhotoSizes: { sizeName: string; size: number }[];

  constructor(private configService: ConfigService) {
    this.newPhotoSizes = [
      {
        sizeName: 'medium',
        size: 600,
      },
      {
        sizeName: 'large',
        size: 2160,
      },
    ];
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
          results: addNewPhotoSize(filteredAdsResults, this.newPhotoSizes),
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
      throw new BadRequestException({
        type: 'error',
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async trackDownload(downloadLInkDto: DownloadLInkDto): Promise<IResponseUnsplash<any>> {
    try {
      const response: IResponseUnsplash<any> = await this.unsplash.photos.trackDownload(
        downloadLInkDto,
      );
      const { status } = response;
      if (status === HttpStatus.OK) {
        return response;
      }
    } catch (error) {
      throw new BadRequestException({
        type: 'error',
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
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
          results: addNewPhotoSize(filteredAdsResults, this.newPhotoSizes),
        };
      } else {
        throw new HttpException(
          {
            type,
            statusCode: status,
            message: 'Error while search photos',
          },
          status,
        );
      }
    } catch (error) {
      throw new BadRequestException({
        type: 'error',
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async getPhoto(photoId: string): Promise<IResponsePhoto<PhotoBasic>> {
    try {
      const unsplashResponse: IResponsePhotoUnsplash<PhotoBasic> = await this.unsplash.photos.get({
        photoId,
      });
      const { type, status, response } = unsplashResponse;
      if (status === HttpStatus.OK) {
        return {
          type,
          statusCode: status,
          result: addNewPhotoSize([response], this.newPhotoSizes)[0],
        };
      } else {
        throw new HttpException(
          {
            type,
            statusCode: status,
            message: 'Error while get photo',
          },
          status,
        );
      }
    } catch (error) {
      throw new BadRequestException({
        type: 'error',
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
