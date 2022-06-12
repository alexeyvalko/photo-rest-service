import { PerPagePipe } from './../pipes/PerPage.pipe';
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { OrderByPhotoListPipe } from 'src/pipes/OrderByPhotoList.pipe';
import { PagePipe } from 'src/pipes/Page.pipe';
import { LatestService } from './latest.service';
import { OrderByType } from 'src/types/unsplash/helpers';

@Controller('latest')
export class LatestController {
  constructor(private readonly latestService: LatestService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getPhotoList(
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) per_page: number,
    @Query('order_by', OrderByPhotoListPipe) order_by: OrderByType,
  ) {
    return this.latestService.getPhotoList({ page, per_page, order_by });
  }
}
