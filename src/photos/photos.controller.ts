import { PerPagePipe } from '../pipes/PerPage.pipe';
import { CacheTTL, Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { OrderByPhotoListPipe } from 'src/pipes/OrderByPhotoList.pipe';
import { PagePipe } from 'src/pipes/Page.pipe';
import { PhotosService } from './photos.service';
import { PhotosOrderByType } from 'src/types/unsplash/helpers';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { SEARCH_CACHE_TIMEOUT } from 'src/config/constants';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get list of photos',
  })
  @HttpCode(HttpStatus.OK)
  @CacheTTL(SEARCH_CACHE_TIMEOUT)
  getPhotoList(
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) perPage: number,
    @Query('order_by', OrderByPhotoListPipe) orderBy: PhotosOrderByType,
  ) {
    return this.photoService.getPhotoList({ page, perPage, orderBy });
  }
}
