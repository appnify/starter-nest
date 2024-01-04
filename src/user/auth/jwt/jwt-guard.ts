import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLICK_KEY } from './jwt-decorator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@/config';

const TokenExpiredError = 'TokenExpiredError';
const JsonWebTokenError = 'JsonWebTokenError';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService, private config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const targets = [context.getClass(), context.getHandler()];
    const isPublic = this.reflector.getAllAndOverride(PUBLICK_KEY, targets);
    const method = request.method.toUpperCase();

    if (isPublic) {
      return true;
    }
    if (isPublic === undefined && method === 'GET') {
      return true;
    }
    const user = await this.extraUserFromAuthHeader(request);
    if (!user) {
      throw new UnauthorizedException('请先登录');
    }

    request.user = user;
    return true;
  }

  async extraUserFromAuthHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer') {
      return null;
    }
    const secret = this.config.jwtSecret;
    let user;
    try {
      user = await this.jwtService.verifyAsync(token, { secret });
    } catch (e) {
      if (e.name === TokenExpiredError) {
        throw new UnauthorizedException('登陆令牌已过期');
      }
      throw new UnauthorizedException('登陆令牌不正确');
    }
    return user;
  }
}
