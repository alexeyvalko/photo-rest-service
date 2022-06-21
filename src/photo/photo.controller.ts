import { CacheTTL, Controller, Get, Param } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { PHOTO_CACHE_TIMEOUT } from 'src/config/constants';

@ApiTags('photo')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get(':photoId')
  @ApiOkResponse({
    description: 'Get photo by ID',
  })
  @CacheTTL(PHOTO_CACHE_TIMEOUT)
  findOne(@Param('photoId') photoId: string) {
    return this.photoService.findOne(photoId);
  }
}
