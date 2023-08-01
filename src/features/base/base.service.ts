import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '@/config';

export class BaseService {
  @Inject(ConfigService)
  protected readonly configService: ConfigService<Config>;

  /**
   * 格式化分页参数
   */
  formatPagination(page?: number, size?: number) {
    const _page = page || this.configService.get('DEFAULT_PAGE', 1);
    const _size = size || this.configService.get('DEFAULT_SIZE', 10);
    return {
      skip: (_page - 1) * _size,
      take: _size,
    };
  }
}
