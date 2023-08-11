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

  paginizate(paging: { page?: number; size?: number; sort?: string }, options: { full?: boolean } = {}) {
    const page = paging.page || this.config.defaultPage;
    const size = paging.size || this.config.defaultPageSize;
    const sort = paging.sort || 'id:desc';
    if (size == 0 && options.full) {
      return {};
    }
    return {
      skip: (page - 1) * size,
      take: size == 0 ? this.config.defaultPageSize : size,
      order: sort.split(',').map((item) => {
        const [field, order] = item.split(':');
        return {
          [field]: order,
        };
      }),
    };
  }
}
