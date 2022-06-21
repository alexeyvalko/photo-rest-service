import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { UnsplashService } from 'src/services/unsplash.service';

@Module({
  controllers: [PhotoController],
  providers: [PhotoService, UnsplashService],
})
export class PhotoModule {}
