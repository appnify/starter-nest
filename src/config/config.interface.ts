export interface Config {
  /**
   * 服务器端口
   */
  SERVER_PORT: number;
  /**
   * 服务器地址
   */
  SERVER_HOST: string;
  /**
   * OPENAPI 地址
   */
  SERVER_OPENAPI_URL: string;
  /**
   * 应用名称
   */
  APP_TITLE: string;
  /**
   * 应用副标题
   */
  APP_SUBTITLE: string;
  /**
   * 数据库类型
   */
  DB_TYPE: string;
  /**
   * SQLite 数据库文件路径
   */
  DB_SQLITE_PATH: string;
  /**
   * 上传文件目录
   */
  UPLOAD_DIR: string;
  /**
   * 上传文件 URL
   */
  UPLOAD_URL: string;
  /**
   * 静态文件目录
   */
  STATIC_DIR: string;
  /**
   * 默认分页
   */
  DEFAULT_PAGE: number;
  /**
   * 默认分页大小
   */
  DEFAULT_SIZE: number;
  /**
   * JWT 密钥
   */
  JWT_SECRET: string;
}
