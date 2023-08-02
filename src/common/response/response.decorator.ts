import { SetMetadata } from '@nestjs/common';

/**
 * 元数据的KEY
 */
export const RESPONSE_KEY = 'APP:RESPONSE';

type RespondFn = {
  (type: 'raw' | 'wrap' | 'pagination'): any;
  /**
   * 原始，返回的数据不会被包装
   */
  RAW: 'raw';
  /**
   * 包装，返回的数据会被包装成统一的格式
   */
  WRAP: 'wrap';
  /**
   * 分页，需返回 `[data, total]` 格式的数据
   */
  PAGINATION: 'pagination';
};

/**
 * 响应结果装饰器
 * @param type 类型
 * @returns
 */
export const Respond = <RespondFn>((type = 'wrap') => {
  return SetMetadata(RESPONSE_KEY, type);
});

Respond.RAW = 'raw';
Respond.WRAP = 'wrap';
Respond.PAGINATION = 'pagination';
