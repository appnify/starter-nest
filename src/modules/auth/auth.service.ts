import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user';
import { AuthUserDto } from './dto/auth-user.dto';
import { LoginedUserVo } from './vo/logined-user.vo';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(authUserDto: AuthUserDto) {
    const user = await this.userService.findByUsername(authUserDto.username);
    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    }
    if (user.password !== authUserDto.password) {
      throw new UnauthorizedException('密码错误');
    }
    const loginedUser = new LoginedUserVo();
    for (const key in loginedUser) {
      loginedUser[key] = user[key];
    }
    loginedUser.token = await this.jwtService.signAsync({ id: user.id, username: user.username });
    return loginedUser;
  }
}
