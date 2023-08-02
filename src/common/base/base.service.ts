import { Inject } from '@nestjs/common';
import { ConfigService } from '@/config';

/**
 * 服务基类
 */
export class BaseService {
  /**
   * 配置服务
   */
  @Inject(ConfigService)
  protected readonly config: ConfigService;

  /**
   * 格式化分页参数
   */
  formatPagination(page = this.config.defaultPage, size = this.config.defaultPageSize) {
    return {
      skip: (page - 1) * size,
      take: size,
    };
  }
}
