import { PipeTransform, Injectable } from '@nestjs/common';
import { SEARCH_COLORS } from 'src/config/constants';

@Injectable()
export class ColorsPipe implements PipeTransform {
  transform(value?: string) {
    if (value) {
      const isCorrectOrderBy = SEARCH_COLORS.includes(value);
      return isCorrectOrderBy ? value : false;
    }
    return false;
  }
}
