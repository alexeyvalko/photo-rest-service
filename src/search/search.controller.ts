import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { PerPagePipe } from 'src/pipes/PerPage.pipe';
import { SearchOrderType, SearchOrientationType } from 'src/types/unsplash/helpers';
import { OrderBySearchPipe } from 'src/pipes/OrderBySearch.pipe';
import { PagePipe } from 'src/pipes/Page.pipe';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/photos')
  @ApiOkResponse({
    description: 'Get list of photos',
  })
  findAllPhotos(
    @Query('query') query: string,
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) perPage: number,
    @Query('order_by', OrderBySearchPipe) orderBy: SearchOrderType,
    @Query('orientation') orientation?: SearchOrientationType,
  ) {
    const options = { query, page, perPage, orderBy, orientation };
    return this.searchService.findAllPhotos(options);
  }
}
