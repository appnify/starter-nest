import { initSwagger } from '@/common/swagger';
import { ConfigService } from '@/config';
import { LoggerService } from '@/monitor/logger';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ScanModule } from './utils/scan.module';

async function bootstrap() {
  /**
   * 创建应用
   */
  const app = await NestFactory.create(AppModule, { bufferLogs: false, snapshot: ScanModule.enable });
  /**
   * 获取配置服务
   */
  const config = app.get(ConfigService);
  /**
   * 获取日志服务
   */
  const logger = app.get(LoggerService);
  /**
   * 全局日志
   */
  app.useLogger(logger);
  /**
   * 允许跨域
   */
  app.enableCors();
  /**
   * API前缀
   */
  app.setGlobalPrefix(config.apiPrefix);
  /**
   * 接口版本
   */
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: config.apiVersion });
  /**
   * 接口文档(swagger)
   */
  initSwagger(app);
  /**
   * 监听端口
   */
  await app.listen(config.port, config.host);
  /**
   * 扫描应用
   */
  ScanModule.scan(app);
  /**
   * 输出项目运行URL
   */
  logger.log(`Application is running at ${await app.getUrl()}`, 'NestApplication');
  /**
   * 输出接口文档URL
   */
  logger.log(`OpenapiDocs is running at ${await app.getUrl()}${config.apiDocPrefix}`, 'NestApplication');
}

bootstrap();
