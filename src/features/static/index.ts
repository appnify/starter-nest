import { ServeStaticModule as module } from '@nestjs/serve-static';
import { join } from 'path';

export const ServeStaticModule = module.forRoot(
  {
    rootPath: join(process.cwd(), 'content/upload'),
    serveRoot: '/upload',
  },
  {
    rootPath: join(process.cwd(), 'public'),
  },
);
