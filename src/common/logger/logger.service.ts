import { ConsoleLogger, Injectable } from '@nestjs/common';
import { dayjs } from '@/libs';

@Injectable()
export class LoggerService extends ConsoleLogger {
  protected getTimestamp(): string {
    return dayjs().format();
  }
}
