import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLICK_KEY } from './jwt-decorator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService, private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (token) {
      const secret = this.configService.get('JWT_SECRET');
      const user = await this.jwtService.verifyAsync(token, { secret });
      request['user'] = user;
    }
    const metadata = [context.getClass(), context.getHandler()];
    const isPublic = this.reflector.getAllAndOverride(PUBLICK_KEY, metadata);
    if (isPublic === undefined || isPublic) {
      return true;
    }
    if (isPublic !== false && request.method.toLowerCase() === 'GET') {
      return true;
    }
    if (!token) {
      throw new UnauthorizedException('请先登录');
    }
    return true;
  }

  extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer') {
      return token;
    }
    return undefined;
  }
}
