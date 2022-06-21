import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Server is running',
      timestamp: Date.now(),
    };
  }
}
