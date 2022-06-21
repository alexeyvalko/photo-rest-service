import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { UnsplashService } from '../services/unsplash.service';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, UnsplashService],
})
export class PhotosModule {}
