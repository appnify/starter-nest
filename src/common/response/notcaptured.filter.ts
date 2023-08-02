import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response as _Response } from 'express';
import { Response } from './response';
import { ResponseCode } from './response.code';

@Catch()
export class AllExecptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<_Response>();
    const message = exception.message;
    const code = ResponseCode.UNKNOWN_ERROR;
    console.log(exception);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(Response.create({ code, message, data: null }));
  }
}
