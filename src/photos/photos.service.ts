import { UnsplashService } from '../services/unsplash.service';
import { Injectable } from '@nestjs/common';
import { IPhotoListOptions } from 'src/types/interfaces';

@Injectable()
export class PhotosService {
  constructor(private unsplashService: UnsplashService) {}

  getPhotoList(options: IPhotoListOptions) {
    return this.unsplashService.getPhotoList(options);
  }
}
