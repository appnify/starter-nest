import { Body, Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './jwt';
import { LocalAuthDto, LocalAuthGuard } from './local';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private accountService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: '账号或密码错误' })
  @ApiResponse({ status: HttpStatus.OK, description: '登录成功' })
  @ApiOperation({ summary: '账号登录', operationId: 'login' })
  login(@Request() req: any, @Body() user: LocalAuthDto) {
    this.accountService.sign(req.user);
  }
}
