import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { LatestService } from './latest.service';

@Controller('latest')
export class LatestController {
  constructor(private readonly latestService: LatestService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.latestService.findAll();
  }
}
