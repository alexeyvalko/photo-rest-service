import { PhotoBasic } from './../types/unsplash/photos';
import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { createApi } from 'unsplash-js';
import { ConfigService } from '@nestjs/config';
import { Unsplash } from 'src/types/unsplash/unsplash';
import { IResponse } from 'src/types/unsplash/responses';

@Injectable()
export class UnsplashService {
  unsplash: Unsplash;
  constructor(private configService: ConfigService) {
    this.unsplash = <Unsplash>createApi({
      accessKey: this.configService.get('unsplash.accessKey'),
      fetch: fetch,
    });
  }

  async getLatestImages(): Promise<any> {
    const response: IResponse<PhotoBasic> = await this.unsplash.photos.list({
      page: 2,
      perPage: 30,
      orderBy: 'latest',
    });

    const {
      type,
      status,
      response: { results, total },
    } = response;
    return { type, status, results, total, total_pages: Math.ceil(total / 30) };
  }
}
