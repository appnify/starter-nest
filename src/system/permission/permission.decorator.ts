import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'APP:PERMISSION';

/**
 * 权限枚举
 */
export const enum PermissionEnum {
  /**
   * 新增
   */
  CREATE = 'create',
  /**
   * 查询
   */
  READ = 'read',
  /**
   * 更新
   */
  UPDATE = 'update',
  /**
   * 删除
   */
  DELETE = 'delete',
}

/**
 * 指定所需的权限
 * @param permissions
 * @returns
 */
export function PermissionWith(...permissions: string[]) {
  return SetMetadata(PERMISSION_KEY, permissions);
}
