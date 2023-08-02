import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExecptionFilter } from './notcaptured.filter';
import { HttpExecptionFilter } from './http.filter';
import { ResponseInterceptor } from './response.interceptor';

@Module({
  providers: [
    /**
     * 全局异常过滤器
     * @description 将异常统一包装成{code, message, data, meta}格式
     */
    {
      provide: APP_FILTER,
      useClass: AllExecptionFilter,
    },
    /**
     * 全局HTTP异常过滤器
     * @description 将HTTP异常统一包装成{code, message, data, meta}格式
     */
    {
      provide: APP_FILTER,
      useClass: HttpExecptionFilter,
    },
    /**
     * 全局响应拦截器
     * @description 将返回值统一包装成{code, message, data, meta}格式
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class ResponseModule {}

export const a = 1;
