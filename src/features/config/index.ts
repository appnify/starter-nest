import { ConfigModule as configModule } from '@nestjs/config';

export const ConfigModule = configModule.forRoot({
  envFilePath: ['.env.local', '.env'],
  isGlobal: true,
});
