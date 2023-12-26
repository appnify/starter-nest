import { ConfigService } from '@/config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

/**
 * 为所有接口添加统一的返回数据结构
 * @param doc OPENAPI文档对象
 * @example
 * ```json
 * {
 *  "code": 2000,
 *  "message": "请求成功",
 *  "data": []
 * }
 * ```
 * @returns
 */
export function addResponseWrapper(doc: OpenAPIObject) {
  for (const path of Object.keys(doc.paths)) {
    const pathItem = doc.paths[path];
    if (!pathItem) {
      continue;
    }
    for (const method of Object.keys(pathItem)) {
      const responses = doc.paths[path][method].responses;
      if (!responses) {
        continue;
      }
      for (const status of Object.keys(responses)) {
        const json = responses[status].content?.['application/json'];
        if (!json) {
          responses[status].content = {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Response',
              },
            },
          };
          continue;
        }
        const schema = json.schema;
        // json.schema = {
        //   allOf: [
        //     {
        //       $ref: '#/components/schemas/Response',
        //     },
        //     {
        //       type: 'object',
        //       properties: {
        //         data: schema,
        //       },
        //       required: ['data'],
        //     },
        //   ],
        // };
        json.schema = {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              description: '状态码',
              example: 2000,
              format: 'int32',
            },
            message: {
              type: 'string',
              description: '提示信息',
              example: '请求成功',
            },
            data: schema,
          },
          required: ['code', 'message'],
        };
      }
    }
  }

  doc.components.schemas.Response = {
    type: 'object',
    properties: {
      code: {
        type: 'integer',
        description: '状态码',
        example: 2000,
        format: 'int32',
      },
      message: {
        type: 'string',
        description: '提示信息',
        example: '请求成功',
      },
    },
    required: ['code', 'message'],
  };

  return doc;
}

/**
 * 初始化Swagger
 * @param app 应用实例
 */
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
    .addTag('post', '文章管理')
    .addTag('file', '文件管理')
    .addTag('menu', '菜单管理')
    .addTag('permission', '权限管理')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory(controllerKey, methodKey) {
      return `${methodKey}`;
    },
  };
  const document = addResponseWrapper(SwaggerModule.createDocument(app, docConfig, options));
  SwaggerModule.setup(config.apiDocPrefix, app, document, {
    jsonDocumentUrl: `${config.apiDocPrefix}.json`,
    yamlDocumentUrl: `${config.apiDocPrefix}.yaml`,
    customfavIcon: '/favicon.ico',
    customSiteTitle: `接口文档 | ${config.subtitle}`,
  });
};
