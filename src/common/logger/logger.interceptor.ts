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
    const handle = () => {
      const ms = Date.now() - now;
      const scope = [context.getClass().name, context.getHandler().name].join('.');
      this.logger.log(`${method} ${url}(${ms} ms) +1`, scope);
    };
    return next.handle().pipe(tap({ next: handle, error: handle }));
  }
}
