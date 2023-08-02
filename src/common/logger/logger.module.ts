import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './logger.interceptor';

/**
 * 日志模块
 * @description 包含全局拦截器
 */
@Global()
@Module({
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
