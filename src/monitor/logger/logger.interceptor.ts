import { CallHandler, ExecutionContext, Inject, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { LoggerService } from './logger.service';

export class LoggerInterceptor implements NestInterceptor {
  @Inject()
  logger: LoggerService;

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const { method, url } = context.switchToHttp().getRequest<Request>();
    const now = Date.now();
    const scope = [context.getClass().name, context.getHandler().name].join('.');
    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - now;
          this.logger.log(`[成功] ${method} ${url}(${ms} ms) +1`, scope);
        },
        error: () => {
          const ms = Date.now() - now;
          this.logger.error(`[失败] ${method} ${url}(${ms} ms) +1`, scope);
        },
      }),
    );
  }
}
