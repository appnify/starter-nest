import { SetMetadata } from '@nestjs/common';

/**
 * 装饰器
 */
export const PUBLICK_KEY = 'isPublic';

/**
 * 公开当前控制器或路由
 */
export const Public = (idPublic = true) => SetMetadata(PUBLICK_KEY, idPublic);
