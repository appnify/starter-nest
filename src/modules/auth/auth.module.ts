import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthService, JwtModule } from './jwt';
import { LocalAuthService } from './local';

@Module({
  imports: [UserModule, JwtModule],
  providers: [AuthService, LocalAuthService, JwtAuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
