import { Injectable, ConsoleLogger } from '@nestjs/common';
import { dayjs } from '@/libraries';
import { ConfigService } from '@/config';
import { Logger, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService extends ConsoleLogger {
  /**
   * Winston实例
   */
  protected logger: Logger;

  /**
   * 构造函数
   */
  constructor(private config: ConfigService) {
    super();
    const { combine, timestamp, printf } = format;
    const printLine = printf(({ level, message, timestamp, context }: any) => {
      return `[Nest] ${process.pid} ${timestamp} ${level} [${context || this.context}]: ${message}`;
    });
    this.logger = createLogger({
      format: combine(timestamp({ format: dayjs.DATETIME }), printLine),
      transports: [
        new transports.DailyRotateFile({
          level: 'info',
          dirname: this.config.logDir,
          filename: '%DATE%.info.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: combine(timestamp({ format: dayjs.DATETIME }), printLine),
        }),
      ],
    });
  }

  /**
   * 重写获取时间戳方法
   */
  protected getTimestamp(): string {
    return dayjs().format();
  }

  /**
   * Info级别日志
   */
  log(message: unknown, context?: unknown, ...rest: unknown[]) {
    super.log(message, context);
    this.logger.info({
      message,
      context: context || this.context,
      ...rest,
    });
  }
}
