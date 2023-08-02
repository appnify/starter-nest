import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';

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
 * 权限装饰器
 * @param permissions
 * @returns
 */
export function NeedPermission(...permissions: PermissionEnum[]) {
  return SetMetadata(PERMISSION_KEY, permissions);
}
