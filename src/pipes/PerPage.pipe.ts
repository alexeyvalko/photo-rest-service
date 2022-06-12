import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class PerPagePipe implements PipeTransform {
  transform(value?: string) {
    if (value) {
      const isNumber = Number.isInteger(+value);
      return isNumber ? value : 10;
    }

    return 10;
  }
}
