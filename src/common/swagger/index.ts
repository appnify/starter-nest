import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
  const config = app.get(ConfigService);
  const docConfig = new DocumentBuilder()
    .setTitle(`${config.title}接口文档`)
    .setVersion('1.0')
    .setDescription('Openapi 3.0文档')
    .setExternalDoc('JSON数据', `${config.apiDocPrefix}.json`)
    .addTag('user', '用户管理')
    .addTag('auth', '认证管理')
    .addTag('role', '角色管理')
    .addTag('permission', '权限管理')
    .addTag('post', '文章管理')
    .addTag('upload', '文件上传')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup(config.apiDocPrefix, app, document, {
    jsonDocumentUrl: `${config.apiDocPrefix}.json`,
    yamlDocumentUrl: `${config.apiDocPrefix}.yaml`,
    customfavIcon: '/favicon.ico',
    customSiteTitle: `接口文档 | ${config.subtitle}`,
  });
};
