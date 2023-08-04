import { Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    /**
     * `@nestjs/config` 的 ConfigService实例
     */
    public config: _ConfigService,
  ) {}

  /**
   * 保留原有的get方法
   */
  get(...args: [string, any]) {
    return this.config.get(...args);
  }

  /**
   * 标题
   * @default 'Appnify'
   */
  get title(): string {
    return this.config.get('TITLE', 'Appnify');
  }

  /**
   * 是否启用CORS(跨域)
   * @default true
   */
  get cors(): boolean {
    return this.config.get('CORS', true);
  }

  /**
   * 副标题
   * @default 'Appnify'
   */
  get subtitle(): string {
    return this.config.get('SUBTITLE', 'Appnify');
  }

  /**
   * API前缀
   * @default '/api'
   */
  get apiPrefix(): string {
    return this.config.get('API_PREFIX', '/api');
  }

  /**
   * API默认版本
   * @default '1'
   */
  get apiVersion(): string {
    return this.config.get('API_VERSION', '1');
  }

  /**
   * API文档前缀
   * @default '/openapi'
   */
  get apiDocPrefix(): string {
    const prefix = this.config.get('API_DOC_PREFIX', '/openapi');
    return prefix.startsWith('/') ? prefix : `/${prefix}`;
  }

  /**
   * 运行端口
   * @default 3030
   */
  get port(): number {
    return Number(this.config.get('SERVER_PORT', 3030));
  }

  /**
   * 运行地址
   * @default '0:0:0:0'
   */
  get host(): string {
    return this.config.get('SERVER_HOST', '0:0:0:0');
  }

  /**
   * 数据库类型
   * @default 'sqlite'
   */
  get dbType(): 'sqlite' | 'mysql' | 'mongodb' {
    return this.config.get('DB_TYPE', 'sqlite');
  }

  /**
   * SQLite数据库文件路径
   * @default './content/db.sqlite'
   */
  get dbSqlitePath(): string {
    return this.config.get('DB_SQLITE_PATH', './content/db.sqlite');
  }

  /**
   * 上传文件目录
   * @default './content/upload'
   */
  get uploadDir(): string {
    return this.config.get('UPLOAD_DIR', './content/upload');
  }

  /**
   * 上传文件URL前缀
   * @default '/uploads'
   */
  get uploadPrefix(): string {
    return this.config.get('UPLOAD_URL', '/uploads');
  }

  /**
   * 静态文件目录
   * @default './content/static'
   */
  get staticDir(): string {
    return this.config.get('STATIC_DIR', './content/static');
  }

  /**
   * 静态文件URL前缀
   * @default '/''
   */
  get staticPrefix(): string {
    return this.config.get('STATIC_PREFIX', '/');
  }

  /**
   * 默认页码
   * @default 1
   */
  get defaultPage(): number {
    return Number(this.config.get('DEFAULT_PAGE_NUMBER', 1));
  }

  /**
   * 默认分页大小
   * @default 10
   */
  get defaultPageSize(): number {
    return Number(this.config.get('DEFAULT_PAGE_SIZE', 10));
  }

  /**
   * JWT密钥
   * @default 'todo'
   */
  get jwtSecret(): string {
    return this.config.get('JWT_SECRET', 'todo');
  }

  /**
   * 日志保存目录
   * @default './content/logs'
   */
  get logDir(): string {
    return this.config.get('LOG_DIR', './content/logs');
  }

  /**
   * SMTP配置
   */
  get smtp() {
    const host: string = this.config.get('SMTP_HOST');
    const port = Number(this.config.get('SMTP_PORT'));
    const user: string = this.config.get('SMTP_USER');
    const pass: string = this.config.get('SMTP_PASS');
    return { host, port, user, pass };
  }

  /**
   * Redis配置
   */
  get redis() {
    const host: string = this.config.get('REDIS_HOST', 'localhost');
    const port = Number(this.config.get('REDIS_PORT', 6379));
    const pass: string = this.config.get('REDIS_PASS', '');
    return { host, port, pass };
  }
}
