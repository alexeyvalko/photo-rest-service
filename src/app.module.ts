import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';
import { SearchModule } from './search/search.module';
import configuration from './config/configuration';
import { GLOBAL_CACHE_TIMEOUT } from './config/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    CacheModule.register({
      ttl: GLOBAL_CACHE_TIMEOUT,
      max: 2000,
      isGlobal: true,
    }),
    PhotosModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
