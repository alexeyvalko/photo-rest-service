import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { UnsplashService } from 'src/services/unsplash.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, UnsplashService],
})
export class SearchModule {}
