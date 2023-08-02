import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { Public } from './jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: '账号或密码错误' })
  @ApiResponse({ description: '登录成功' })
  @ApiOperation({ description: '账号登录', operationId: 'login' })
  login(@Body() user: AuthUserDto) {
    return this.authService.signIn(user);
  }
}
