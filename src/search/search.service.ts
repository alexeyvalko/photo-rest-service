import { Injectable } from '@nestjs/common';
import { UnsplashService } from 'src/services/unsplash.service';
import { ISearchOptions } from 'src/types/interfaces';
import { deleteFalsyKeys } from 'src/utils';

@Injectable()
export class SearchService {
  constructor(private unsplashService: UnsplashService) {}
  findAllPhotos(options: ISearchOptions) {
    const filteredOptions = deleteFalsyKeys(options) as ISearchOptions;
    return this.unsplashService.searchPhotos(filteredOptions);
  }
}
