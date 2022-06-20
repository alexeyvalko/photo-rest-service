import { CacheTTL, Controller, Get, Param } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('photo')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get(':photoId')
  @ApiOkResponse({
    description: 'Get photo by ID',
  })
  @CacheTTL(500000)
  findOne(@Param('photoId') photoId: string) {
    return this.photoService.findOne(photoId);
  }
}
