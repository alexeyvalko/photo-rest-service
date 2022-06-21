import { PipeTransform, Injectable } from '@nestjs/common';
import { ORIENTATION_OPTIONS } from 'src/config/constants';

@Injectable()
export class OrientationPipe implements PipeTransform {
  transform(value?: string) {
    if (value) {
      const isCorrectOrderBy = ORIENTATION_OPTIONS.includes(value);
      return isCorrectOrderBy ? value : false;
    }
    return false;
  }
}
