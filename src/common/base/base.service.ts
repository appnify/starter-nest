import { ConfigService } from '@/config';
import { BaseEntity } from '@/database';
import { Inject } from '@nestjs/common';
import { Between, FindManyOptions } from 'typeorm';

interface Params {
  page: number;
  size: number;
  startDateTime: string;
  endDateTime: string;
}

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

  mergeCommonParams(params: Params): FindManyOptions<BaseEntity> {
    const { page, size, startDateTime, endDateTime } = params;
    const skip = (page - 1) * size;
    const take = size === 0 ? this.config.defaultPageSize : size;
    const fromDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    return {
      skip,
      take,
      where: {
        createdAt: Between(fromDate, endDate),
      },
    };
  }
}
