import { PerPagePipe } from '../pipes/PerPage.pipe';
import {
  Body,
  CacheTTL,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { OrderByPhotoListPipe } from 'src/pipes/OrderByPhotoList.pipe';
import { PagePipe } from 'src/pipes/Page.pipe';
import { PhotosService } from './photos.service';
import { PhotosOrderByType } from 'src/types/unsplash/helpers';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { GLOBAL_CACHE_TIMEOUT, NO_CACHE_TIMEOUT, PHOTO_CACHE_TIMEOUT } from 'src/config/constants';
import { DownloadLInkDto } from './dto/downloadLInkDto';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get list of photos',
  })
  @HttpCode(HttpStatus.OK)
  @CacheTTL(GLOBAL_CACHE_TIMEOUT)
  getPhotoList(
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) perPage: number,
    @Query('order_by', OrderByPhotoListPipe) orderBy: PhotosOrderByType,
  ) {
    return this.photoService.getPhotoList({ page, perPage, orderBy });
  }

  @Get(':photoId')
  @ApiOkResponse({
    description: 'Get photo by ID',
  })
  @CacheTTL(PHOTO_CACHE_TIMEOUT)
  findOne(@Param('photoId') photoId: string) {
    return this.photoService.findOne(photoId);
  }

  @Post('download')
  @ApiOkResponse({
    description: 'Track download photo',
  })
  @CacheTTL(NO_CACHE_TIMEOUT)
  @HttpCode(HttpStatus.OK)
  async create(@Body() downloadLInkDto: DownloadLInkDto) {
    await this.photoService.trackDownload(downloadLInkDto);
    return { status: 'success', url: downloadLInkDto.downloadLocation };
  }
}
