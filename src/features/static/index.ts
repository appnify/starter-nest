import { ConfigService } from '@nestjs/config';
import { ServeStaticModule as _ServeStaticModule } from '@nestjs/serve-static';
import { Config } from '@/config';

export const ServeStaticModule = _ServeStaticModule.forRootAsync({
  useFactory: (configService: ConfigService<Config>) => {
    return [
      {
        rootPath: configService.get<string>('UPLOAD_DIR', 'uploads'),
        serveRoot: configService.get<string>('UPLOAD_URL', '/uploads'),
      },
      {
        rootPath: configService.get<string>('STATIC_DIR', 'public'),
      },
    ];
  },
  inject: [ConfigService],
});
