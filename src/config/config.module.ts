import { Global, Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

const envFilePath = ['.env.development.locale', '.env.development', '.env.local', '.env'];

/**
 * 配置模块
 * @description 基于 `@nestjs/config` 封装，提供更便捷且类型安全的配置读取方式
 */
@Global()
@Module({
  imports: [_ConfigModule.forRoot({ envFilePath })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
