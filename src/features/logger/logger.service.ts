import { ConsoleLogger, Injectable } from '@nestjs/common';
import { dayjs } from 'src/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  protected getTimestamp(): string {
    return dayjs().format();
  }
}
