import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { Public } from './jwt/jwt-decorator';
import { LoginLogInterceptor } from '@/monitor/log';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 账号登陆
   */
  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(LoginLogInterceptor)
  @ApiOperation({ description: '登陆', operationId: 'login' })
  login(@Body() user: AuthUserDto) {
    return this.authService.signIn(user);
  }

  /**
   * 获取登陆信息
   */
  @Post('info')
  @ApiOperation({ description: '获取登陆用户信息', operationId: 'getUserInfo' })
  getUserInfo(@Req() req: Request) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('请登陆后再尝试');
    }
    return this.authService.getUserInfo(userId);
  }
}
