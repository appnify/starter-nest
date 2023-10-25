import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permission.decorator';
import { UserService } from '@/system/user';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, @Inject(forwardRef(() => UserService)) private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const controller = context.getClass();
    const handler = context.getHandler();
    const permissions = this.reflector.getAllAndMerge(PERMISSION_KEY, [controller, handler]);
    if (!permissions || !permissions.length) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user;
    if (!user) {
      throw new UnauthorizedException('用户未登录');
    }
    const userPermissions = await this.userService.findUserPermissions(user.id);
    const hasPermission = permissions.every((permission) => userPermissions.includes(permission));
    if (!hasPermission) {
      throw new UnauthorizedException('权限不足');
    }
    return true;
  }
}
