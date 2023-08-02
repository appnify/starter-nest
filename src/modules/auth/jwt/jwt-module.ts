import { ConfigService } from '@/config';
import { JwtModule as _JwtModule } from '@nestjs/jwt';

export const JwtModule = _JwtModule.registerAsync({
  useFactory: (config: ConfigService) => {
    return {
      secret: config.jwtSecret,
      signOptions: {
        expiresIn: '60000s',
      },
    };
  },
  inject: [ConfigService],
});
