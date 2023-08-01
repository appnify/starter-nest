import { Config } from '@/config';
import { ConfigService } from '@nestjs/config';
import { JwtModule as _JwtModule } from '@nestjs/jwt';

export const JwtModule = _JwtModule.registerAsync({
  useFactory: (configService: ConfigService<Config>) => {
    return {
      secret: configService.get('JWT_SECRET', 'todo'),
      signOptions: {
        expiresIn: '60000s',
      },
    };
  },
  inject: [ConfigService],
});
