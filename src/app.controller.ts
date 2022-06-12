import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('ping')
@Controller('ping')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Server is running' })
  getHello(): string {
    return this.appService.getHello();
  }
}
