import { Response, ResponseCode } from '../response';

interface Options {
  page: number;
  size: number;
  [key: string]: any;
}

type WrapOptions<T> = {
  page: number;
  size: number;
  total: number;
  data: T[];
};

export const defaultPage = 1;

export const defaultSize = 10;

/**
 * 分页工具类
 */
export class Pagination {
  /**
   * 包装响应结果
   */
  static wrap<T>(options: WrapOptions<T>) {
    const { page = defaultPage, size = defaultSize, total, data } = options;
    return Response.create({
      code: ResponseCode.SUCESS,
      message: '请求成功',
      data,
      meta: { page, size, total },
    });
  }
  /**
   * 将分页参数转换为typeorm查询参数
   */
  static optionize(options: Options) {
    const { page = defaultPage, size: take = defaultSize, ...where } = options || {};
    const skip = (page - 1) * take;
    return { skip, take, where };
  }
}
