import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard, JwtModule } from './jwt';
import { APP_GUARD } from '@nestjs/core';
import { LogModule } from '@/monitor/log';

@Module({
  imports: [UserModule, JwtModule, LogModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
