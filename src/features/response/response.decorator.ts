import { SetMetadata } from '@nestjs/common';

/**
 * 元数据的KEY
 */
export const RESPONSE_KEY = 'resultor';

/**
 * 响应结果的类型
 */
export enum ResponseType {
  /**
   * 包装类型，返回的数据会被包装成统一的格式
   */
  WRAP = 'wrap',
  /**
   * 原始类型，返回的数据不会被包装
   */
  RAW = 'raw',
  /**
   * 分页类型，返回的数据会被包装成统一的格式，并且会包含分页信息
   */
  PAGINATION = 'pagination',
}

/**
 * 响应结果装饰器的参数
 */
export class ResponseOptions {
  /**
   * 类型，默认为wrap
   */
  type?: ResponseType = ResponseType.WRAP;
}

/**
 * 响应结果装饰器
 * @param options 参数
 * @returns
 */
export const Responsing = (options: ResponseOptions) => {
  return SetMetadata(RESPONSE_KEY, { ...ResponseOptions, ...options });
};
