import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { EntitySubscripber } from './suscribers/entify.subscriber';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestMiddleware } from './suscribers/request.middleware';

/**
 * 数据库模块
 * @description 基于 `typeorm` 封装
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
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
    }),
  ],
  providers: [EntitySubscripber],
})
export class DatabaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
