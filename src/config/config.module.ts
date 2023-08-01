import { ConfigModule as _ConfigModule } from '@nestjs/config';

export const ConfigModule = _ConfigModule.forRoot({
  envFilePath: ['.env.development', '.env.local', '.env'],
  isGlobal: true,
});
