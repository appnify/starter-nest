import { ConfigService } from '@/config';
import { ServeStaticModule as _ServeStaticModule } from '@nestjs/serve-static';

export const ServeStaticModule = _ServeStaticModule.forRootAsync({
  useFactory: (config: ConfigService) => {
    return [
      {
        rootPath: config.uploadDir,
        serveRoot: config.uploadPrefix,
      },
      {
        rootPath: config.staticDir,
      },
    ];
  },
  inject: [ConfigService],
});
