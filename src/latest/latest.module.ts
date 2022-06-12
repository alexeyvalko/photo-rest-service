import { Module } from '@nestjs/common';
import { LatestService } from './latest.service';
import { LatestController } from './latest.controller';
import { UnsplashService } from '../services/unsplash.service';

@Module({
  controllers: [LatestController],
  providers: [LatestService, UnsplashService],
})
export class LatestModule {}
