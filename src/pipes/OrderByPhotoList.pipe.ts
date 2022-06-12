import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class OrderByPhotoListPipe implements PipeTransform {
  transform(value?: string) {
    if (value) {
      const isCorrectOrderBy = ['latest', 'oldest', 'popular'].includes(value);
      return isCorrectOrderBy ? value : 'latest';
    }

    return 'latest';
  }
}
