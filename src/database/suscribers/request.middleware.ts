import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { EntitySubscripber } from './entify.subscriber';

@Injectable()
export class RequestMiddleware<R extends Request = any, T = any> implements NestMiddleware<R, T> {
  use(req: R, res: T, next: (error?: any) => void) {
    EntitySubscripber.setRequest(req);
    next();
  }
}
