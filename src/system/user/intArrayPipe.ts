import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class IntArrayPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      throw Error(`${value} 不是字符串`);
    }
    const idStrs = value.split(',');
    const ids: number[] = [];
    for (const idStr of idStrs) {
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        continue;
      }
      ids.push(id);
    }
    return ids;
  }
}
