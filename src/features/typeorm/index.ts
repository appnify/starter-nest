import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './datasource';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Config } from '@/config';
export * from './datasource';
export * from './entities/base';

/**
 * 连接数据库
 */
export const TypeormModule = TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService<Config>) => {
    const type = configService.get<string>('DB_TYPE', 'sqlite');
    if (type === 'sqlite') {
      const database = configService.get<string>('DB_SQLITE_PATH', 'database/db.sqlite');
      return {
        type,
        database,
        synchronize: true,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      };
    }
    if (type === 'mysql') {
    }
    return ormConfig;
  },
  inject: [ConfigService],
});
