import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Config } from '@/config';

export const initSwagger = (app: INestApplication) => {
  const configService = app.get(ConfigService<Config>);
  const openapiUrl = configService.get<string>('SERVER_OPENAPI_URL', 'openapi');
  const appTitle = configService.get<string>('APP_TITLE', 'Apptify');
  const appSubtitle = configService.get<string>('APP_SUBTITLE', 'Apptify');
  const config = new DocumentBuilder()
    .setTitle(`${appTitle}接口文档`)
    .setVersion('1.0')
    .setDescription('Openapi 3.0文档')
    .setExternalDoc('JSON数据', `${openapiUrl}.json`)
    .addTag('user', '用户管理')
    .addTag('auth', '认证管理')
    .addTag('role', '角色管理')
    .addTag('permission', '权限管理')
    .addTag('post', '文章管理')
    .addTag('upload', '文件上传')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(openapiUrl, app, document, {
    jsonDocumentUrl: `${openapiUrl}.json`,
    yamlDocumentUrl: `${openapiUrl}.yaml`,
    customfavIcon: '/favicon.ico',
    customSiteTitle: `接口文档 | ${appSubtitle}`,
  });
};
