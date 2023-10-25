import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { Public } from './jwt';
import { LoginedUserVo } from './vo/logined-user.vo';
import { LoginLogInterceptor } from '@/monitor/log';

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
  login(@Body() user: AuthUserDto): Promise<LoginedUserVo> {
    return this.authService.signIn(user);
  }
}