import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const openapiUrl = configService.get<string>('SERVER_OPENAPI_URL', 'openapi');
  const appTitle = configService.get<string>('APP_TITLE', 'Apptify');
  const appSubtitle = configService.get<string>('APP_SUBTITLE', 'Apptify');
  const config = new DocumentBuilder()
    .setTitle(`${appTitle}接口文档`)
    .setVersion('1.0')
    .setDescription('Openapi 3.0文档')
    .setExternalDoc('JSON数据', `${openapiUrl}.json`)
    .addTag('user', '用户管理')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(openapiUrl, app, document, {
    jsonDocumentUrl: `${openapiUrl}.json`,
    yamlDocumentUrl: `${openapiUrl}.yaml`,
    customfavIcon: '/favicon.ico',
    customSiteTitle: `接口文档 | ${appSubtitle}`,
  });
};
