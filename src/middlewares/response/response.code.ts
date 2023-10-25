/**
 * 响应码枚举，首位与HTTP状态码保持一致
 */
export enum ResponseCode {
  /**
   * 操作成功
   */
  SUCESS = 2000,
  /**
   * 客户端未知错误
   */
  ERROR = 4000,
  /**
   * 令牌错误
   */
  TOKEN_ERORR = 4050,
  /**
   * 登陆过期
   */
  TOKEN_EXPIRED = 4051,
  /**
   * 参数错误
   */
  PARAM_ERROR = 4005,
  /**
   * 服务端未知错误
   */
  UNKNOWN_ERROR = 5000,
  /**
   * 未授权
   */
  UNAUTHORIZED = 4001,
}
