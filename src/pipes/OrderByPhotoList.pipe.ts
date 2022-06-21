import { PipeTransform, Injectable } from '@nestjs/common';
import { DEFAULT_ORDER_BY_PHOTO_LIST, ORDER_BY_PHOTO_LIST } from 'src/config/constants';

@Injectable()
export class OrderByPhotoListPipe implements PipeTransform {
  transform(value?: string) {
    if (value) {
      const isCorrectOrderBy = ORDER_BY_PHOTO_LIST.includes(value);
      return isCorrectOrderBy ? value : DEFAULT_ORDER_BY_PHOTO_LIST;
    }

    return DEFAULT_ORDER_BY_PHOTO_LIST;
  }
}
