import { Injectable } from '@nestjs/common';
import { UnsplashService } from 'src/services/unsplash.service';

@Injectable()
export class PhotoService {
  constructor(private unsplashService: UnsplashService) {}
  findOne(photoId: string) {
    return this.unsplashService.getPhoto(photoId);
  }
}
