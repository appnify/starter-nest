import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CreateUsersTable1682693329275 } from '../migrations/1682693329275-CreateUsersTable';
import { MockPosts1685026010848 } from '../migrations/1685026010848-MockPosts';

/**
 * 基本配置
 */
export const baseConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'content/database/database.sqlite',
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

/**
 * 用于运行时连接数据库
 */
export const ormConfig: TypeOrmModuleOptions = {
  ...baseConfig,
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
};

/**
 * 用于生成迁移文件
 */
export const cliConfig: DataSourceOptions = {
  ...baseConfig,
  entities: ['src/**/*.entity.ts'],
  migrations: [CreateUsersTable1682693329275, MockPosts1685026010848],
};

/**
 * 用于生成迁移文件
 */
export default new DataSource(cliConfig);
