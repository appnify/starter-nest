import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LogService } from '../log.service';

export class AuthLogInterceptor implements NestInterceptor {
  constructor(private logger: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap({
        next(data) {
          console.log('auth ok', data);
        },
        error(err) {
          console.log('auth err', err);
        },
      }),
    );
  }

  success() {}
}
