import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initSwagger, LoggerService } from 'src/features';
import { AppModule } from './app.module';

async function bootstrap() {
  const { SERVER_HOST, SERVER_PORT } = process.env;
  /**
   * 创建应用
   */
  const app = await NestFactory.create(AppModule, { bufferLogs: false });
  /**
   * 使用全局日志
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
  app.setGlobalPrefix('/api');
  /**
   * 接口版本
   */
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  /**
   * 接口文档(swagger)
   */
  initSwagger(app);
  /**
   * 监听端口
   */
  await app.listen(SERVER_PORT, SERVER_HOST);
  /**
   * 输出项目运行URL
   */
  logger.log(`Application is running at ${await app.getUrl()}`, 'NestApplication');
  /**
   * 输出接口文档URL
   */
  logger.log(`OpenapiDocs is running at ${await app.getUrl()}/openapi`, 'NestApplication');
}

bootstrap();
