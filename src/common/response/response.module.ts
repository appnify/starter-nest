import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExecptionFilter } from './notcaptured.filter';
import { HttpExecptionFilter } from './http.filter';
import { ResponseInterceptor } from './response.interceptor';

/**
 * 响应模块
 * @description 包含全局异常/HTTP异常/响应结果拦截器
 */
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExecptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExecptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class ResponseModule {}
