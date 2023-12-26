import { ConfigService } from '@/config';
import { ServeStaticModule as _ServeStaticModule } from '@nestjs/serve-static';

/**
 * 静态资源模块
 * @see https://docs.nestjs.com/techniques/mvc#serve-static
 */
export const ServeStaticModule = _ServeStaticModule.forRootAsync({
  useFactory: (config: ConfigService) => {
    return [
      {
        rootPath: config.uploadDir,
        serveRoot: config.uploadPrefix,
        serveStaticOptions: {
          fallthrough: false,
        },
      },
      {
        rootPath: config.staticDir,
        serveRoot: config.staticPrefix,
        serveStaticOptions: {
          fallthrough: false,
        },
      },
    ];
  },
  inject: [ConfigService],
});
