import { JwtModule as Jwt } from '@nestjs/jwt';

export const JwtModule = Jwt.register({
  secret: 'secret',
  signOptions: {
    expiresIn: '60000s',
  },
});
