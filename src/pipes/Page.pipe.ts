import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class PagePipe implements PipeTransform {
  transform(value?: string) {
    if (value) {
      const isNumber = Number.isInteger(+value);
      return isNumber ? value : 1;
    }

    return 1;
  }
}
