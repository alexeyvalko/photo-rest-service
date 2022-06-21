import { PipeTransform, Injectable } from '@nestjs/common';
import { DEFAULT_PER_PAGE } from 'src/config/constants';

@Injectable()
export class PerPagePipe implements PipeTransform {
  transform(value?: string) {
    if (value) {
      const isNumber = Number.isInteger(+value);
      return isNumber ? value : DEFAULT_PER_PAGE;
    }

    return DEFAULT_PER_PAGE;
  }
}
