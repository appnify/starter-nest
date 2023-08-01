import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(authUserDto: AuthUserDto) {
    const user = await this.userService.findByUsername(authUserDto.username);
    const { password, ...result } = user;
    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    }
    if (password !== authUserDto.password) {
      throw new UnauthorizedException('密码错误');
    }
    return this.jwtService.signAsync(result);
  }
}
