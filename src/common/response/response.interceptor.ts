import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { Response } from './response';
import { RESPONSE_KEY, Respond } from './response.decorator';
import { Request } from 'express';
import { ConfigService } from '@/config';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector, private config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controller = context.getClass();
    const handler = context.getHandler();
    const type = this.reflector.getAllAndOverride(RESPONSE_KEY, [controller, handler]);
    return next.handle().pipe(
      map((data: any) => {
        if (type === Respond.RAW) {
          return data;
        }
        if (type === Respond.PAGINATION) {
          const request = context.switchToHttp().getRequest<Request>();
          const [list, total] = data;
          if (request.query.meta) {
            const page = Number(request.query.page || this.config.defaultPage);
            const size = Number(request.query.size || this.config.defaultPageSize);
            return Response.success({
              data: list,
              meta: { page, size, total },
            });
          }
          return Response.success({ data: list, total });
        }
        if (data instanceof Response) {
          return data;
        }
        return Response.success({ data });
      }),
    );
  }
}
