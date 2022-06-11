import { UnsplashService } from '../unsplash/unsplash.service';
import { Injectable } from '@nestjs/common';
import { CreateLatestDto } from './dto/create-latest.dto';

@Injectable()
export class LatestService {
  constructor(private unsplashService: UnsplashService) {}
  create(createLatestDto: CreateLatestDto) {
    return 'This action adds a new latest';
  }

  findAll(): any {
    return this.unsplashService.getLatestImages();
  }
}
