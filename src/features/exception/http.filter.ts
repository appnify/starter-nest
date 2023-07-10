import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response as _Response } from 'express';
import { Response } from '../response';

@Catch(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<_Response>();
    const code = exception.getStatus();
    const message = exception.message;

    response.status(code).json(Response.error(null, message));
  }
}
