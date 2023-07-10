import { ApiProperty } from '@nestjs/swagger';
import { ResponseCode } from './response.code';

/**
 * 响应结果
 */
export class Response<T = any> {
  /**
   * 状态码
   * @example 2000
   */
  @ApiProperty({
    type: 'number',
    example: 2000,
  })
  code?: ResponseCode;
  /**
   * 响应消息
   * @example '请求成功'
   */
  @ApiProperty({
    type: 'string',
    example: '请求成功',
  })
  message?: string;
  /**
   * 响应数据
   * @example 1
   */
  @ApiProperty({})
  data: T;
  /**
   * 响应元数据
   * @example { total: 100 }
   */
  meta?: any;
  /**
   * 创建成功响应结果
   */
  static success(data: any, message = '请求成功') {
    return this.create({ code: ResponseCode.SUCESS, message, data });
  }
  /**
   * 创建失败响应结果
   */
  static error(data = null, message = '请求失败') {
    return this.create({ code: ResponseCode.ERROR, message, data });
  }
  /**
   * 创建响应结果
   */
  static create<T>(result: Response<T>) {
    const response = new Response();
    const data = Object.assign(response, result);
    return data;
  }
}
