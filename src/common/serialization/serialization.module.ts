import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

/**
 * 序列化模块
 * @description 包含全局序列化拦截器
 */
@Module({
  providers: [
    /**
     * 全局序列化拦截器
     * @description 由于中间件的洋葱机制，需放在响应拦截器之前，否则无法检测到实例类型
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class SerializationModule {}
