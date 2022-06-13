import { PerPagePipe } from './../pipes/PerPage.pipe';
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { OrderByPhotoListPipe } from 'src/pipes/OrderByPhotoList.pipe';
import { PagePipe } from 'src/pipes/Page.pipe';
import { LatestService } from './latest.service';
import { OrderByType } from 'src/types/unsplash/helpers';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('latest')
@Controller('latest')
export class LatestController {
  constructor(private readonly latestService: LatestService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get list of photos',
  })
  @HttpCode(HttpStatus.OK)
  getPhotoList(
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) perPage: number,
    @Query('order_by', OrderByPhotoListPipe) orderBy: OrderByType,
  ) {
    return this.latestService.getPhotoList({ page, perPage, orderBy });
  }
}
