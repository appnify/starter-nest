import { CallHandler, ExecutionContext, Inject, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';

export class LoggerInterceptor implements NestInterceptor {
  @Inject()
  logger: LoggerService;

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const controller = context.getClass();
    const handler = context.getHandler();
    const { method, url } = context.switchToHttp().getRequest<Request>();
    this.logger.log(`${method} ${url} +1`, `${controller.name}.${handler.name}`);
    return next.handle();
  }
}
