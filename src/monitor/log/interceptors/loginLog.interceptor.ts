import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LogService } from '../log.service';

@Injectable()
export class LoginLogInterceptor implements NestInterceptor {
  constructor(private logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap({
        next: (data) => {
          const status = true;
          const description = '用户登录成功';
          this.recordLoginLog(context, { status, description });
        },
        error: (err) => {
          const status = false;
          const description = err?.message || '用户登录失败';
          this.recordLoginLog(context, { status, description });
        },
      }),
    );
  }

  recordLoginLog(context: ExecutionContext, data: { status: boolean; description: string }) {
    const { ip, body, headers } = context.switchToHttp().getRequest();
    const { status, description } = data;
    const userAgent = headers['user-agent'] as string;
    const forwradIp = headers['x-forwarded-for'] as string;
    const nickname = body.username;
    this.logService.addLoginLog({
      nickname,
      status,
      description,
      userAgent,
      ip: forwradIp || ip,
    });
  }
}
