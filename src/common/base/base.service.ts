import { ConfigService } from '@/config';
import { Inject } from '@nestjs/common';

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
  formatPagination(page = this.config.defaultPage, size = this.config.defaultPageSize, supportFull = false) {
    if (size == 0 && supportFull) {
      return {};
    }
    return {
      skip: (page - 1) * size,
      take: size == 0 ? this.config.defaultPageSize : size,
    };
  }
}
