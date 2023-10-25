import { ConfigService } from '@/config';
import { Inject } from '@nestjs/common';
import { LoggerService } from '../../monitor/logger';

/**
 * 控制器基类
 */
export class BaseController {
  /**
   * 日志服务
   */
  @Inject(LoggerService)
  readonly logger: LoggerService;

  /**
   * 配置服务
   */
  @Inject(ConfigService)
  readonly config: ConfigService;
}
