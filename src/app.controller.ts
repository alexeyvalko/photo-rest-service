import { CacheTTL, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { NO_CACHE_TIMEOUT } from './config/constants';

@ApiTags('ping')
@Controller('ping')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Server is running' })
  @CacheTTL(NO_CACHE_TIMEOUT)
  getHello() {
    return this.appService.getHello();
  }
}
