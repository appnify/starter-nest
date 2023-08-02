import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { validationPipeFactory } from './validation.pipe';
import { ValidationExecptionFilter } from './validation.filter';

/**
 * 校验模块
 * @description 包含全局验证管道和全局验证异常过滤器
 */
@Module({
  providers: [
    /**
     * 全局验证管道
     * @description 校验和转换输入数据
     */
    {
      provide: APP_PIPE,
      useFactory: validationPipeFactory,
    },
    /**
     * 全局验证异常过滤器
     * @description 将验证异常统一包装成{code, message, data, meta}格式
     */
    {
      provide: APP_FILTER,
      useClass: ValidationExecptionFilter,
    },
  ],
})
export class ValidationModule {}
