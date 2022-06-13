import { PipeTransform, Injectable } from '@nestjs/common';
import { DEFAULT_PAGE } from 'src/config/constants';

@Injectable()
export class PagePipe implements PipeTransform {
  transform(value?: string) {
    if (value) {
      const isNumber = Number.isInteger(+value);
      return isNumber ? value : DEFAULT_PAGE;
    }

    return DEFAULT_PAGE;
  }
}
