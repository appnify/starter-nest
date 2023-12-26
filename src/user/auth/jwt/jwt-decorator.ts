import { SetMetadata } from '@nestjs/common';

/**
 * 装饰器
 */
export const PUBLICK_KEY = 'isPublic';

/**
 * 是否需要登陆才能访问
 */
export function Public(isPublic = true) {
  return SetMetadata(PUBLICK_KEY, isPublic);
}
