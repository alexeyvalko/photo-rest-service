import { Injectable } from '@nestjs/common';
import { UnsplashService } from 'src/services/unsplash.service';
import { ISearchOptions } from 'src/types/interfaces';

@Injectable()
export class SearchService {
  constructor(private unsplashService: UnsplashService) {}
  findAllPhotos(options: ISearchOptions) {
    return this.unsplashService.searchPhotos(options);
  }
}
