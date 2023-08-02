import { OpenAPIObject } from '@nestjs/swagger';

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
          continue;
        }
        const schema = json.schema;
        json.schema = {
          allOf: [
            {
              $ref: '#/components/schemas/Response',
            },
            {
              type: 'object',
              properties: {
                data: schema,
              },
            },
          ],
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
