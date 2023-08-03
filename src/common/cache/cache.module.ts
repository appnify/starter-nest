import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { CacheModule as _CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    _CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const { host, port } = config.redis;
        return {
          // store: () =>
          //   redisStore({
          //     commandsQueueMaxLength: 1000,
          //     socket: { host, port },
          //   }) as any,
          db: 0,
          ttl: 600,
        };
      },
    }),
  ],
  controllers: [CacheController],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
