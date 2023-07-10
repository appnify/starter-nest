import { ExecutionContext, Injectable } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PUBLICK_KEY } from './jwt-decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const metadata = [context.getClass(), context.getHandler()];
    const isPublic = this.reflector.getAllAndOverride(PUBLICK_KEY, metadata);

    const routeMethod = context.switchToHttp().getRequest<Request>().method;

    if (routeMethod === 'GET' && isPublic !== false) return true;

    if (isPublic) return true;
    return super.canActivate(context);
  }
}

export const AppJwtGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
