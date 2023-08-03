import { SetMetadata } from '@nestjs/common';

/**
 * 元数据的KEY
 */
export const RESPONSE_KEY = 'APP:RESPONSE';

/**
 * 响应结果类型
 */
export enum RespondType {
  /**
   * 原始，返回的数据不会被包装
   */
  RAW = 'raw',
  /**
   * 包装，返回的数据会被包装成统一的格式
   */
  WRAP = 'wrap',
  /**
   * 分页，需返回 `[data, total]` 格式的数据
   */
  PAGINATION = 'pagination',
}

/**
 * 响应结果装饰器
 * @param type 类型
 * @returns
 */
export const Respond = (type = RespondType.WRAP) => {
  return SetMetadata(RESPONSE_KEY, type);
};
