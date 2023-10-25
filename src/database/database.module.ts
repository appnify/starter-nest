import { ConfigService } from '@/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { EntitySubscripber } from './suscribers/entify.subscriber';
import { RequestMiddleware } from './suscribers/request.middleware';

const TypeormModule = TypeOrmModule.forRootAsync({
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
      return {
        type: config.dbType,
        host: config.sqlHost,
        port: config.sqlPort,
        username: config.sqlUser,
        password: config.sqlPass,
        database: config.sqlDatabase,
        synchronize: true,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      };
    }
  },
  inject: [ConfigService],
});

/**
 * 数据库模块
 * @description 基于 `typeorm` 封装
 */
@Module({
  imports: [TypeormModule],
  providers: [EntitySubscripber],
})
export class DatabaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
