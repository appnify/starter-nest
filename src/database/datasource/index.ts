import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CreateUsersTable1682693329275 } from '../migrations/1682693329275-CreateUsersTable';
import { MockPosts1685026010848 } from '../migrations/1685026010848-MockPosts';

/**
 * 用于生成迁移文件
 */
export default new DataSource({
  type: 'sqlite',
  database: 'database/db.sqlite',
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/**/*.entity.ts'],
  migrations: [CreateUsersTable1682693329275, MockPosts1685026010848],
});
