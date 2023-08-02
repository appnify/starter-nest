import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseCode } from '../response';
import { AppValidationError } from './validation.error';

@Catch(AppValidationError)
export class ValidationExecptionFilter implements ExceptionFilter {
  catch(exception: AppValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = ResponseCode.PARAM_ERROR;
    const message = exception.message;
    const data = exception.messages;
    response.status(HttpStatus.BAD_REQUEST).json({ code, message, data });
  }
}
