import { Inject } from '@nestjs/common';
import { LoggerService } from '../logger';

/**
 * 基础控制器
 */
export class BaseController {
  /**
   * 日志服务
   */
  @Inject(LoggerService)
  readonly logger: LoggerService;
}
