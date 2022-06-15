import { PipeTransform, Injectable } from '@nestjs/common';
import { DEFAULT_ORDER_BY_SEARCH, ORDER_BY_SEARCH } from 'src/config/constants';

@Injectable()
export class OrderBySearchPipe implements PipeTransform {
  transform(value?: string) {
    if (value) {
      const isCorrectOrderBy = ORDER_BY_SEARCH.includes(value);
      return isCorrectOrderBy ? value : DEFAULT_ORDER_BY_SEARCH;
    }

    return DEFAULT_ORDER_BY_SEARCH;
  }
}
