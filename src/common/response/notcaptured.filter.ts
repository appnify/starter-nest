import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response as _Response } from 'express';
import { Response } from './response';
import { ResponseCode } from './response.code';
import { LoggerService } from '../logger';

@Catch()
export class AllExecptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<_Response>();
    const message = exception.message;
    const code = ResponseCode.UNKNOWN_ERROR;
    console.trace(exception);
    this.logger.error(exception, `${request.method} ${request.url}`);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(Response.create({ code, message, data: null }));
  }
}
