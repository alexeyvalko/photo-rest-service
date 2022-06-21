import { OrientationPipe } from './../pipes/Orientation.pipe';
import { CacheTTL, Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { PerPagePipe } from 'src/pipes/PerPage.pipe';
import {
  SearchColorsType,
  SearchOrderType,
  SearchOrientationType,
} from 'src/types/unsplash/helpers';
import { OrderBySearchPipe } from 'src/pipes/OrderBySearch.pipe';
import { PagePipe } from 'src/pipes/Page.pipe';
import { ColorsPipe } from 'src/pipes/Colors.pipe';
import { SEARCH_CACHE_TIMEOUT } from 'src/config/constants';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/photos')
  @ApiOkResponse({
    description: 'Get list of photos',
  })
  @CacheTTL(SEARCH_CACHE_TIMEOUT)
  findAllPhotos(
    @Query('query') query: string,
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) perPage: number,
    @Query('order_by', OrderBySearchPipe) orderBy: SearchOrderType,
    @Query('orientation', OrientationPipe) orientation?: SearchOrientationType,
    @Query('color', ColorsPipe) color?: SearchColorsType,
  ) {
    const options = { query, page, perPage, orderBy, orientation, color };
    return this.searchService.findAllPhotos(options);
  }
}
