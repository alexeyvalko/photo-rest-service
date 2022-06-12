import { UnsplashService } from '../services/unsplash.service';
import { Injectable } from '@nestjs/common';
import { IPhotoListOptions } from 'src/types/types';

@Injectable()
export class LatestService {
  constructor(private unsplashService: UnsplashService) {}

  getPhotoList(options: IPhotoListOptions) {
    return this.unsplashService.getPhotoList(options);
  }
}
