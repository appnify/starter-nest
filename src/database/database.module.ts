import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

/**
 * 数据库模块
 * @description 基于 `typeorm` 封装
 */
export const DatabaseModule = TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => {
    if (config.dbType === 'sqlite') {
      return {
        type: config.dbType,
        database: config.dbSqlitePath,
        synchronize: true,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      };
    }
    if (config.dbType === 'mysql') {
    }
  },
  inject: [ConfigService],
});
