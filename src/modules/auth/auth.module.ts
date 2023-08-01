import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from './jwt';

@Module({
  controllers: [AuthController],
  imports: [UserModule, JwtModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
