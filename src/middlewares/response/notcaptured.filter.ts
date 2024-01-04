import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response as _Response } from 'express';
import { LoggerService } from '../../monitor/logger';
import { Response } from './response';
import { ResponseCode } from './response.code';

@Catch()
export class AllExecptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<_Response>();
    const message = exception.message;
    const code = ResponseCode.UNKNOWN_ERROR;

    console.trace(exception);
    this.logger.error(exception, `${request.method} ${request.url}`);

    //  静态文件路径不存在的异常
    if (exception.code === 'ENOENT') {
      const res = Response.create({ code: ResponseCode.ERROR, message: '访问路径不存在' });
      return response.status(exception.status).json(res);
    }

    // 其他异常
    const res = Response.create({ code, message });
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
  }
}
