import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response as _Response } from 'express';
import { Response } from './response';
import { ResponseCode } from './response.code';
import { LoggerService } from '../logger';

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
      return response.status(exception.status).json(
        Response.create({
          code: ResponseCode.ERROR,
          message: '访问的路径不存在',
        }),
      );
    }

    // 令牌过期
    if(exception.name === 'TokenExpiredError') {
      return response.status(HttpStatus.UNAUTHORIZED).json(
        Response.create({
          code: ResponseCode.TOKEN_EXPIRED,
          message: '登陆已过期'
        })
      )
    }

    // 令牌错误
    if(exception.name === 'JsonWebTokenError') {
      return response.status(HttpStatus.UNAUTHORIZED).json(
        Response.create({
          code: ResponseCode.TOKEN_ERORR,
          message: '登陆令牌错误'
        })
      )
    }

    // 其他异常
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      Response.create({
        code,
        message,
      }),
    );
  }
}
